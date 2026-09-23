import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS
app.use('/api/*', cors());

/**
 * Middleware: Extract and verify Telegram User info
 */
app.use('/api/*', async (c, next) => {
  const initData = c.req.header('x-telegram-init-data') || '';
  let tgUser = null;

  if (initData) {
    try {
      const urlParams = new URLSearchParams(initData);
      const userStr = urlParams.get('user');
      if (userStr) {
        tgUser = JSON.parse(userStr);
      }
    } catch (e) {}
  }

  // Dev fallback for browser testing
  if (!tgUser) {
    const devUserId = c.req.header('x-dev-telegram-id') || '123456789';
    const devUsername = c.req.header('x-dev-telegram-username') || 'alex_tg';
    const devName = c.req.header('x-dev-telegram-name') || 'Alex Rivera';

    tgUser = {
      id: String(devUserId),
      first_name: devName.split(' ')[0] || 'Dev',
      last_name: devName.split(' ')[1] || 'User',
      username: devUsername,
      photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
  } else {
    tgUser.id = String(tgUser.id);
  }

  c.set('tgUser', tgUser);
  await next();
});

// GET /api/user/me - Get current user profile and products
app.get('/api/user/me', async (c) => {
  try {
    const tgUser = c.get('tgUser');
    const { results } = await c.env.DB.prepare(
      'SELECT id, title, price, currency, images, is_sold, created_at FROM products WHERE seller_telegram_id = ? ORDER BY created_at DESC'
    ).bind(tgUser.id).all();

    const formattedProducts = (results || []).map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]')
    }));

    return c.json({
      user: tgUser,
      productsCount: formattedProducts.length,
      myProducts: formattedProducts
    });
  } catch (err) {
    console.error('D1 error in /api/user/me:', err);
    return c.json({ error: 'Failed to fetch user profile from D1' }, 500);
  }
});

// GET /api/products - Search, Filter, & Sort products from D1
app.get('/api/products', async (c) => {
  try {
    const tgUser = c.get('tgUser');
    const q = c.req.query('q');
    const category = c.req.query('category');
    const location = c.req.query('location');
    const min_price = c.req.query('min_price');
    const max_price = c.req.query('max_price');
    const sort = c.req.query('sort');
    const seller_id = c.req.query('seller_id');

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (seller_id) {
      sql += ' AND seller_telegram_id = ?';
      params.push(seller_id);
    }

    if (q && q.trim() !== '') {
      sql += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ? OR seller_username LIKE ?)';
      const searchTerm = `%${q.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (location && location !== 'All') {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (min_price && !isNaN(min_price)) {
      sql += ' AND price >= ?';
      params.push(Number(min_price));
    }

    if (max_price && !isNaN(max_price)) {
      sql += ' AND price <= ?';
      params.push(Number(max_price));
    }

    if (sort === 'price_asc') {
      sql += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      sql += ' ORDER BY price DESC';
    } else if (sort === 'popular') {
      sql += ' ORDER BY views DESC';
    } else {
      sql += ' ORDER BY created_at DESC';
    }

    const { results } = await c.env.DB.prepare(sql).bind(...params).all();

    const formattedRows = (results || []).map(item => ({
      ...item,
      images: JSON.parse(item.images || '[]'),
      is_owner: String(item.seller_telegram_id) === String(tgUser.id)
    }));

    return c.json(formattedRows);
  } catch (err) {
    console.error('Error fetching products from D1:', err);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// GET /api/products/:id - Single product detail
app.get('/api/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const tgUser = c.get('tgUser');

    const product = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Increment view counter in D1
    c.executionCtx.waitUntil(
      c.env.DB.prepare('UPDATE products SET views = views + 1 WHERE id = ?').bind(id).run()
    );

    const formattedProduct = {
      ...product,
      images: JSON.parse(product.images || '[]'),
      views: product.views + 1,
      is_owner: String(product.seller_telegram_id) === String(tgUser.id)
    };

    return c.json(formattedProduct);
  } catch (err) {
    console.error('Error in D1 product detail:', err);
    return c.json({ error: 'Failed to fetch product detail' }, 500);
  }
});

// GET /api/images/:key - Serve product images from Cloudflare R2 Object Storage
app.get('/api/images/:key', async (c) => {
  try {
    const key = c.req.param('key');
    if (!c.env.IMAGES_BUCKET) {
      return c.text('R2 Bucket not configured', 500);
    }

    const object = await c.env.IMAGES_BUCKET.get(key);

    if (!object) {
      return c.text('Image not found', 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'image/jpeg');
    }

    return new Response(object.body, { headers });
  } catch (err) {
    console.error('Error fetching image from R2:', err);
    return c.text('Error serving image', 500);
  }
});

// POST /api/upload - Upload images directly to Cloudflare R2 Object Storage
app.post('/api/upload', async (c) => {
  try {
    const body = await c.req.parseBody();
    const urls = [];

    if (body.images) {
      const imagesArr = Array.isArray(body.images) ? body.images : [body.images];
      
      for (let i = 0; i < imagesArr.length; i++) {
        const item = imagesArr[i];
        const randomStr = Math.random().toString(36).substring(2, 8);
        const timestamp = Date.now();

        if (item instanceof File) {
          const ext = item.name.split('.').pop() || 'jpg';
          const key = `img-${timestamp}-${randomStr}.${ext}`;
          const arrayBuffer = await item.arrayBuffer();
          const contentType = item.type || 'image/jpeg';

          if (c.env.IMAGES_BUCKET) {
            await c.env.IMAGES_BUCKET.put(key, arrayBuffer, {
              httpMetadata: { contentType }
            });
            urls.push(`/api/images/${key}`);
          } else {
            // Fallback to base64 if R2 binding not available
            const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            urls.push(`data:${contentType};base64,${base64}`);
          }
        } else if (typeof item === 'string') {
          if (item.startsWith('data:image/')) {
            // Base64 string payload: convert to Buffer and store in R2
            const matches = item.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
            if (matches) {
              const contentType = matches[1];
              const ext = contentType.split('/')[1] || 'jpg';
              const key = `img-${timestamp}-${randomStr}.${ext}`;
              const base64Data = matches[2];
              const binaryStr = atob(base64Data);
              const bytes = new Uint8Array(binaryStr.length);
              for (let j = 0; j < binaryStr.length; j++) {
                bytes[j] = binaryStr.charCodeAt(j);
              }

              if (c.env.IMAGES_BUCKET) {
                await c.env.IMAGES_BUCKET.put(key, bytes.buffer, {
                  httpMetadata: { contentType }
                });
                urls.push(`/api/images/${key}`);
              } else {
                urls.push(item);
              }
            } else {
              urls.push(item);
            }
          } else {
            // Standard external URL
            urls.push(item);
          }
        }
      }
    }

    if (urls.length === 0) {
      urls.push('https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80');
    }

    return c.json({ urls });
  } catch (err) {
    console.error('R2 upload error:', err);
    return c.json({ error: 'R2 Image upload failed' }, 500);
  }
});

// POST /api/products - Create new product listing in D1
app.post('/api/products', async (c) => {
  try {
    const tgUser = c.get('tgUser');
    const body = await c.req.json();
    const { title, description, price, currency, location, contact_phone, category, images } = body;

    if (!title || price === undefined || price === null || !location) {
      return c.json({ error: 'Title, price, and location are required' }, 400);
    }

    const imageArray = Array.isArray(images) ? images : [];
    const sellerName = `${tgUser.first_name} ${tgUser.last_name || ''}`.trim();

    const result = await c.env.DB.prepare(`
      INSERT INTO products (
        seller_telegram_id, seller_name, seller_username, title, description, price, currency, location, contact_phone, category, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      tgUser.id,
      sellerName,
      tgUser.username || `user_${tgUser.id}`,
      title.trim(),
      description ? description.trim() : '',
      Number(price),
      currency || '$',
      location.trim(),
      contact_phone ? contact_phone.trim() : '',
      category || 'Other',
      JSON.stringify(imageArray)
    ).run();

    const newId = result.meta.last_row_id;
    const newProduct = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(newId).first();

    return c.json({
      ...newProduct,
      images: JSON.parse(newProduct.images || '[]'),
      is_owner: true
    }, 201);
  } catch (err) {
    console.error('Error inserting product into D1:', err);
    return c.json({ error: 'Failed to create product listing' }, 500);
  }
});

// PUT /api/products/:id - Edit listing in D1 (Owner validation)
app.put('/api/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const tgUser = c.get('tgUser');
    const body = await c.req.json();

    const existing = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
    if (!existing) {
      return c.json({ error: 'Product not found' }, 404);
    }

    if (String(existing.seller_telegram_id) !== String(tgUser.id)) {
      return c.json({ error: 'Permission denied: Only the seller can edit this listing' }, 403);
    }

    const updatedTitle = body.title !== undefined ? body.title.trim() : existing.title;
    const updatedDesc = body.description !== undefined ? body.description.trim() : existing.description;
    const updatedPrice = body.price !== undefined ? Number(body.price) : existing.price;
    const updatedCurrency = body.currency || existing.currency;
    const updatedLoc = body.location !== undefined ? body.location.trim() : existing.location;
    const updatedPhone = body.contact_phone !== undefined ? body.contact_phone.trim() : existing.contact_phone;
    const updatedCat = body.category || existing.category;
    const updatedImages = body.images !== undefined ? JSON.stringify(body.images) : existing.images;
    const updatedSold = body.is_sold !== undefined ? (body.is_sold ? 1 : 0) : existing.is_sold;

    await c.env.DB.prepare(`
      UPDATE products
      SET title = ?, description = ?, price = ?, currency = ?, location = ?, contact_phone = ?, category = ?, images = ?, is_sold = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(updatedTitle, updatedDesc, updatedPrice, updatedCurrency, updatedLoc, updatedPhone, updatedCat, updatedImages, updatedSold, id).run();

    const updatedProduct = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();

    return c.json({
      ...updatedProduct,
      images: JSON.parse(updatedProduct.images || '[]'),
      is_owner: true
    });
  } catch (err) {
    console.error('Error updating D1 product:', err);
    return c.json({ error: 'Failed to update product listing' }, 500);
  }
});

// DELETE /api/products/:id - Delete listing from D1 (Owner validation)
app.delete('/api/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const tgUser = c.get('tgUser');

    const existing = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
    if (!existing) {
      return c.json({ error: 'Product not found' }, 404);
    }

    if (String(existing.seller_telegram_id) !== String(tgUser.id)) {
      return c.json({ error: 'Permission denied: Only the creator can delete this listing' }, 403);
    }

    await c.env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    return c.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting from D1:', err);
    return c.json({ error: 'Failed to delete product' }, 500);
  }
});

// GET /api/meta/filters - Categories & locations
app.get('/api/meta/filters', async (c) => {
  try {
    const categories = ['All', 'CFA Level 1', 'CFA Level 2', 'FRM Part 1', 'FRM Part 2', 'Courses', 'Others'];
    const { results } = await c.env.DB.prepare('SELECT DISTINCT location FROM products').all();
    const locations = ['All', ...new Set((results || []).map(l => l.location).filter(Boolean))];

    return c.json({ categories, locations });
  } catch (e) {
    return c.json({
      categories: ['All', 'CFA Level 1', 'CFA Level 2', 'FRM Part 1', 'FRM Part 2', 'Courses', 'Others'],
      locations: ['All']
    });
  }
});

// Serve static assets / fallback
app.get('*', async (c) => {
  if (c.env.ASSETS) {
    return c.env.ASSETS.fetch(c.req.raw);
  }
  return c.text('Cloudflare Worker API Server Ready');
});

export default app;
