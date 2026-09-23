import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { queryAll, queryOne, execute } from './db.js';
import { telegramAuth } from './auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure upload directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Apply Telegram Auth Middleware to all API routes
app.use('/api', telegramAuth);

// --- API ROUTES ---

// GET /api/user/me - Get current user profile
app.get('/api/user/me', async (req, res) => {
  try {
    const userProducts = await queryAll(
      'SELECT id, title, price, currency, images, is_sold, created_at FROM products WHERE seller_telegram_id = ? ORDER BY created_at DESC',
      [req.tgUser.id]
    );

    const formattedProducts = userProducts.map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]')
    }));

    res.json({
      user: req.tgUser,
      productsCount: formattedProducts.length,
      myProducts: formattedProducts
    });
  } catch (err) {
    console.error('Error in /api/user/me:', err);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

// GET /api/products - Search, Filter, & Sort products
app.get('/api/products', async (req, res) => {
  try {
    const { q, category, location, min_price, max_price, sort, seller_id } = req.query;

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    // Filter by seller ID
    if (seller_id) {
      sql += ' AND seller_telegram_id = ?';
      params.push(seller_id);
    }

    // Keyword Search (Title, Description, Location, Seller username)
    if (q && q.trim() !== '') {
      sql += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ? OR seller_username LIKE ?)';
      const searchTerm = `%${q.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Category Filter
    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    // Location Filter
    if (location && location !== 'All') {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    // Min Price
    if (min_price && !isNaN(min_price)) {
      sql += ' AND price >= ?';
      params.push(Number(min_price));
    }

    // Max Price
    if (max_price && !isNaN(max_price)) {
      sql += ' AND price <= ?';
      params.push(Number(max_price));
    }

    // Sorting
    if (sort === 'price_asc') {
      sql += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      sql += ' ORDER BY price DESC';
    } else if (sort === 'popular') {
      sql += ' ORDER BY views DESC';
    } else {
      // Default: newest first
      sql += ' ORDER BY created_at DESC';
    }

    const rows = await queryAll(sql, params);

    const formattedRows = rows.map(item => ({
      ...item,
      images: JSON.parse(item.images || '[]'),
      is_owner: String(item.seller_telegram_id) === String(req.tgUser.id)
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product details
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await queryOne('SELECT * FROM products WHERE id = ?', [id]);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment view count asynchronously
    await execute('UPDATE products SET views = views + 1 WHERE id = ?', [id]);

    const formattedProduct = {
      ...product,
      images: JSON.parse(product.images || '[]'),
      views: product.views + 1,
      is_owner: String(product.seller_telegram_id) === String(req.tgUser.id)
    };

    res.json(formattedProduct);
  } catch (err) {
    console.error('Error fetching product detail:', err);
    res.status(500).json({ error: 'Failed to fetch product detail' });
  }
});

// POST /api/upload - Handle image file uploads
app.post('/api/upload', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files uploaded' });
    }

    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ urls: fileUrls });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// POST /api/products - Create a new product listing
app.post('/api/products', async (req, res) => {
  try {
    const { title, description, price, currency, location, contact_phone, category, images } = req.body;

    if (!title || price === undefined || price === null || !location) {
      return res.status(400).json({ error: 'Title, price, and location are required' });
    }

    const imageArray = Array.isArray(images) ? images : [];

    const result = await execute(`
      INSERT INTO products (
        seller_telegram_id, seller_name, seller_username, title, description, price, currency, location, contact_phone, category, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      req.tgUser.id,
      `${req.tgUser.first_name} ${req.tgUser.last_name}`.trim(),
      req.tgUser.username,
      title.trim(),
      description ? description.trim() : '',
      Number(price),
      currency || '$',
      location.trim(),
      contact_phone ? contact_phone.trim() : '',
      category || 'Other',
      JSON.stringify(imageArray)
    ]);

    const newProduct = await queryOne('SELECT * FROM products WHERE id = ?', [result.lastID]);
    res.status(201).json({
      ...newProduct,
      images: JSON.parse(newProduct.images || '[]'),
      is_owner: true
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product listing' });
  }
});

// PUT /api/products/:id - Edit product listing (Owner restricted)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, currency, location, contact_phone, category, images, is_sold } = req.body;

    // Check ownership
    const existing = await queryOne('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (String(existing.seller_telegram_id) !== String(req.tgUser.id)) {
      return res.status(403).json({ error: 'Permission denied: Only the creator can edit this listing' });
    }

    const updatedTitle = title !== undefined ? title.trim() : existing.title;
    const updatedDesc = description !== undefined ? description.trim() : existing.description;
    const updatedPrice = price !== undefined ? Number(price) : existing.price;
    const updatedCurrency = currency || existing.currency;
    const updatedLoc = location !== undefined ? location.trim() : existing.location;
    const updatedPhone = contact_phone !== undefined ? contact_phone.trim() : existing.contact_phone;
    const updatedCat = category || existing.category;
    const updatedImages = images !== undefined ? JSON.stringify(images) : existing.images;
    const updatedSold = is_sold !== undefined ? (is_sold ? 1 : 0) : existing.is_sold;

    await execute(`
      UPDATE products
      SET title = ?, description = ?, price = ?, currency = ?, location = ?, contact_phone = ?, category = ?, images = ?, is_sold = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [updatedTitle, updatedDesc, updatedPrice, updatedCurrency, updatedLoc, updatedPhone, updatedCat, updatedImages, updatedSold, id]);

    const updatedProduct = await queryOne('SELECT * FROM products WHERE id = ?', [id]);

    res.json({
      ...updatedProduct,
      images: JSON.parse(updatedProduct.images || '[]'),
      is_owner: true
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product listing' });
  }
});

// DELETE /api/products/:id - Delete product listing (Owner restricted)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await queryOne('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (String(existing.seller_telegram_id) !== String(req.tgUser.id)) {
      return res.status(403).json({ error: 'Permission denied: Only the creator can delete this listing' });
    }

    await execute('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Product listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product listing' });
  }
});

// GET /api/meta/filters - Get list of categories and locations
app.get('/api/meta/filters', async (req, res) => {
  try {
    const categories = ['All', 'CFA Level 1', 'CFA Level 2', 'FRM Part 1', 'FRM Part 2', 'Courses', 'Others'];
    const locationsRaw = await queryAll('SELECT DISTINCT location FROM products');
    const locations = ['All', ...new Set(locationsRaw.map(l => l.location).filter(Boolean))];

    res.json({ categories, locations });
  } catch (err) {
    res.json({
      categories: ['All', 'CFA Level 1', 'CFA Level 2', 'FRM Part 1', 'FRM Part 2', 'Courses', 'Others'],
      locations: ['All']
    });
  }
});

// Fallback to static client build in production
const clientBuildDir = path.join(__dirname, '../dist');
if (fs.existsSync(clientBuildDir)) {
  app.use(express.static(clientBuildDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Telegram Marketplace Server listening on http://localhost:${PORT}`);
});
