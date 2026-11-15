# Telegram Mini App Marketplace - Implementation & Deployment Guide
Telegram Mini App for sharing/selling digital & offline products
This project is a mobile-first **Telegram Mini App Marketplace** built with React, Vite, Express, SQLite, and adapted for deployment to **Cloudflare Workers** with **Cloudflare D1**.

---

## 🛠 Features Included

- **Product Management**: List, view, edit, and delete products (Price, Name, Pictures, Location, Contact Number, Telegram ID / Username).
- **Telegram Authentication**: Telegram `initData` HMAC verification with dev fallback.
- **Creator Ownership Enforcement**: Only the user who posted a product can edit or delete their listing.
- **URL Generation & Deep Linking**: One-click product link sharing (`https://.../?product=<id>`) with direct navigation.
- **Search, Sort & Filter**: Real-time keyword search, sorting (Price Low/High, Newest, Views), and category/location/price filters.
- **Dual Runtime Support**: Runs locally via Node/Express or serverless via Cloudflare Workers + D1.

---

## 🚀 How to Run Locally (Node.js + Express + SQLite)

```bash
cd marketplace
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

## ☁️ How to Test & Deploy to Cloudflare Workers & D1

### Step 1: Initialize Local Cloudflare D1 Database

```bash
npx wrangler d1 execute tg-marketplace-db --local --file=schema.sql
```

### Step 2: Test Cloudflare Worker locally

```bash
npm run wrangler:dev
```

This will build your frontend and start a local Cloudflare Worker simulation with D1 on `http://localhost:8787`.

### Step 3: Deploy to Cloudflare Workers Production

1. Login to your Cloudflare account (first time only):
   ```bash
   npx wrangler login
   ```

2. Create production D1 database on Cloudflare:
   ```bash
   npx wrangler d1 create tg-marketplace-db
   ```
   *(Copy the generated `database_id` into your `wrangler.json` file)*

3. Run SQL migration on remote production D1:
   ```bash
   npx wrangler d1 execute tg-marketplace-db --remote --file=schema.sql
   ```

4. Deploy Worker & Static Assets:
   ```bash
   npm run deploy
   ```

Once deployed, Cloudflare will provide a free production `https://` URL (e.g. `https://tg-marketplace-mini-app.your-subdomain.workers.dev`) which you can directly set in **BotFather** for your Telegram Mini App button!