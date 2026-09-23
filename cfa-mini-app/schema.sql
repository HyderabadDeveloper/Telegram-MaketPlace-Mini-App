-- Cloudflare D1 Database Schema for CFA Telegram Mini App

CREATE TABLE IF NOT EXISTS users (
    telegram_id TEXT PRIMARY KEY,
    first_name TEXT,
    username TEXT,
    solved_total INTEGER DEFAULT 0,
    correct_total INTEGER DEFAULT 0,
    daily_completed INTEGER DEFAULT 0,
    daily_target INTEGER DEFAULT 10,
    streak INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topic_stats (
    telegram_id TEXT,
    topic_id TEXT,
    attempted INTEGER DEFAULT 0,
    correct INTEGER DEFAULT 0,
    PRIMARY KEY (telegram_id, topic_id),
    FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_history (
    id TEXT PRIMARY KEY,
    telegram_id TEXT,
    topic_name TEXT,
    mode TEXT,
    score INTEGER,
    total INTEGER,
    percentage INTEGER,
    time_spent INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
);

-- Index for fast user history queries
CREATE INDEX IF NOT EXISTS idx_history_user_date ON quiz_history(telegram_id, created_at DESC);
