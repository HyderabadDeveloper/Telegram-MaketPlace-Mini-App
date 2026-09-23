-- Cloudflare D1 Database Migration Script

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  photo_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
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
);

-- Seed Sample Products for CFA & FRM Marketplace
INSERT OR REPLACE INTO products (id, seller_telegram_id, seller_name, seller_username, title, description, price, currency, location, contact_phone, category, images, views)
VALUES 
(1, '123456789', 'Alex Rivera', 'alex_tg', 'Schweser CFA Level 1 Study Notes & Question Bank 2024', 'Complete set of 5 Schweser Secret Sauce books + Practice Exams 1 & 2 for CFA Level 1 2024 exam. Highlighted in key areas, overall pristine condition.', 3500, '₹', 'Mumbai', '+91 98765 43210', 'CFA Level 1', '["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80"]', 142),
(2, '987654321', 'Elena Rostova', 'elena_m', 'CFA Level 2 Official Curriculum Complete Set 2024', 'Original hardcopy books provided by CFA Institute for Level 2 (Volumes 1-6). Unopened, untouched condition with formula sheets.', 6200, '₹', 'Jaipur', '+91 98123 45678', 'CFA Level 2', '["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"]', 98),
(3, '123456789', 'Alex Rivera', 'alex_tg', 'FRM Part 1 Bionic Turtle & Schweser Notes Bundle', 'Complete study guide for FRM Part 1 including Financial Markets, Quantitative Analysis & Risk Models. Includes formula quick sheets.', 2800, '₹', 'Mumbai', '+91 98765 43210', 'FRM Part 1', '["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80"]', 185),
(4, '555666777', 'David Kim', 'dkim_tech', 'FRM Part 2 GARP Official Books + Mock Test Papers', 'Official GARP FRM Part 2 book set along with 10 full length mock tests & practice questions. Excellent condition.', 3900, '₹', 'Delhi', '+91 99887 76655', 'FRM Part 2', '["https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=80"]', 76);
