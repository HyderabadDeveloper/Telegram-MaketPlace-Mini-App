import crypto from 'crypto';

/**
 * Middleware to extract and optionally verify Telegram user data from initData string or headers.
 */
export function telegramAuth(req, res, next) {
  const initData = req.headers['x-telegram-init-data'] || req.body?.initData || req.query?.initData;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  let tgUser = null;

  if (initData) {
    try {
      const urlParams = new URLSearchParams(initData);
      const hash = urlParams.get('hash');
      const userStr = urlParams.get('user');

      if (userStr) {
        tgUser = JSON.parse(userStr);
      }

      // Optional cryptographic HMAC validation if TELEGRAM_BOT_TOKEN is provided in env
      if (botToken && hash && tgUser) {
        urlParams.delete('hash');
        const dataCheckArr = [];
        for (const [key, value] of urlParams.entries()) {
          dataCheckArr.push(`${key}=${value}`);
        }
        dataCheckArr.sort();
        const dataCheckString = dataCheckArr.join('\n');

        const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
        const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

        if (calculatedHash !== hash) {
          console.warn('Telegram initData HMAC hash verification failed!');
          // In production, return res.status(401).json({ error: 'Invalid Telegram authentication' });
        }
      }
    } catch (err) {
      console.error('Failed to parse Telegram initData:', err.message);
    }
  }

  // Dev mode or browser testing fallback if no initData is present
  if (!tgUser) {
    const devUserId = req.headers['x-dev-telegram-id'] || '123456789';
    const devUsername = req.headers['x-dev-telegram-username'] || 'alex_tg';
    const devName = req.headers['x-dev-telegram-name'] || 'Alex Rivera';

    tgUser = {
      id: devUserId,
      first_name: devName.split(' ')[0] || 'Dev',
      last_name: devName.split(' ')[1] || 'User',
      username: devUsername,
      photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
  }

  req.tgUser = {
    id: String(tgUser.id),
    first_name: tgUser.first_name || 'User',
    last_name: tgUser.last_name || '',
    username: tgUser.username || `user_${tgUser.id}`,
    photo_url: tgUser.photo_url || ''
  };

  next();
}
