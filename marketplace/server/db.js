import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'marketplace.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
    initTables();
  }
});

function initTables() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id TEXT UNIQUE NOT NULL,
        first_name TEXT,
        last_name TEXT,
        username TEXT,
        photo_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Products table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seller_telegram_id TEXT NOT NULL,
        seller_name TEXT NOT NULL,
        seller_username TEXT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        currency TEXT DEFAULT '₹',
        location TEXT NOT NULL,
        contact_phone TEXT,
        category TEXT DEFAULT 'Others',
        images TEXT NOT NULL,
        views INTEGER DEFAULT 0,
        is_sold INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, () => {
      seedInitialData();
    });
  });
}

function seedInitialData() {
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (err || (row && row.count > 0)) return; // Already seeded or error

    console.log('Seeding initial marketplace products...');

    const sampleProducts = [
      {
        seller_telegram_id: '123456789',
        seller_name: 'Alex Rivera',
        seller_username: 'alex_tg',
        title: 'Schweser CFA Level 1 Study Notes & Question Bank 2024',
        description: 'Complete set of 5 Schweser Secret Sauce books + Practice Exams 1 & 2 for CFA Level 1 2024 exam. Highlighted in key areas, overall pristine condition.',
        price: 3500,
        currency: '₹',
        location: 'Mumbai',
        contact_phone: '+91 98765 43210',
        category: 'CFA Level 1',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
        ]),
        views: 142
      },
      {
        seller_telegram_id: '987654321',
        seller_name: 'Elena Rostova',
        seller_username: 'elena_m',
        title: 'CFA Level 2 Official Curriculum Complete Set 2024',
        description: 'Original hardcopy books provided by CFA Institute for Level 2 (Volumes 1-6). Unopened, untouched condition with formula sheets.',
        price: 6200,
        currency: '₹',
        location: 'Jaipur',
        contact_phone: '+91 98123 45678',
        category: 'CFA Level 2',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
        ]),
        views: 98
      },
      {
        seller_telegram_id: '123456789',
        seller_name: 'Alex Rivera',
        seller_username: 'alex_tg',
        title: 'FRM Part 1 Bionic Turtle & Schweser Notes Bundle',
        description: 'Complete study guide for FRM Part 1 including Financial Markets, Quantitative Analysis & Risk Models. Includes formula quick sheets.',
        price: 2800,
        currency: '₹',
        location: 'Mumbai',
        contact_phone: '+91 98765 43210',
        category: 'FRM Part 1',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80'
        ]),
        views: 185
      },
      {
        seller_telegram_id: '555666777',
        seller_name: 'David Kim',
        seller_username: 'dkim_tech',
        title: 'FRM Part 2 GARP Official Books + Mock Test Papers',
        description: 'Official GARP FRM Part 2 book set along with 10 full length mock tests & practice questions. Excellent condition.',
        price: 3900,
        currency: '₹',
        location: 'Delhi',
        contact_phone: '+91 99887 76655',
        category: 'FRM Part 2',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=80'
        ]),
        views: 76
      }
    ];

    const stmt = db.prepare(`
      INSERT INTO products (seller_telegram_id, seller_name, seller_username, title, description, price, currency, location, contact_phone, category, images, views)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    sampleProducts.forEach(p => {
      stmt.run([
        p.seller_telegram_id,
        p.seller_name,
        p.seller_username,
        p.title,
        p.description,
        p.price,
        p.currency,
        p.location,
        p.contact_phone,
        p.category,
        p.images,
        p.views
      ]);
    });

    stmt.finalize();
    console.log('Sample products seeded successfully.');
  });
}

// Helper DB wrapper functions using Promises
export const queryAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const queryOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const execute = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

export default db;
