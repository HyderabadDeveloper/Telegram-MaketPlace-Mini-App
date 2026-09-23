/**
 * Telegram WebApp SDK Helper Utilities
 */

export const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

export function initTelegramApp() {
  if (tg) {
    tg.ready();
    tg.expand();
    // Enable closing confirmation if needed
    if (tg.enableClosingConfirmation) {
      tg.enableClosingConfirmation();
    }
  }
}

export function getTelegramUser() {
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const u = tg.initDataUnsafe.user;
    return {
      id: String(u.id),
      first_name: u.first_name || 'Telegram',
      last_name: u.last_name || '',
      username: u.username || '',
      photo_url: u.photo_url || ''
    };
  }

  // Local browser dev mode fallback
  const storedUser = localStorage.getItem('tg_dev_user');
  if (storedUser) {
    try { return JSON.parse(storedUser); } catch (e) {}
  }

  const defaultDevUser = {
    id: '123456789',
    first_name: 'Alex',
    last_name: 'Rivera',
    username: 'alex_tg',
    photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  };

  return defaultDevUser;
}

export function setDevUser(userObj) {
  localStorage.setItem('tg_dev_user', JSON.stringify(userObj));
}

export function getInitData() {
  return tg ? (tg.initData || '') : '';
}

export function hapticImpact(style = 'light') {
  if (tg && tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(style);
  }
}

export function hapticNotification(type = 'success') {
  if (tg && tg.HapticFeedback) {
    tg.HapticFeedback.notificationOccurred(type);
  }
}

export function openTelegramChat(username, contactPhone) {
  hapticImpact('medium');
  if (username) {
    const cleanUsername = username.replace(/^@/, '');
    const url = `https://t.me/${cleanUsername}`;
    if (tg && tg.openTelegramLink) {
      tg.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  } else if (contactPhone) {
    window.open(`tel:${contactPhone}`, '_blank');
  }
}

export function shareProduct(product) {
  hapticImpact('medium');
  const baseUrl = window.location.origin + window.location.pathname;
  const productUrl = `${baseUrl}?product=${product.id}`;
  const shareText = `Check out this listing on Telegram Marketplace: ${product.title} - ${product.currency}${product.price}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`;

  if (tg && tg.openTelegramLink) {
    tg.openTelegramLink(telegramShareUrl);
  } else if (navigator.share) {
    navigator.share({
      title: product.title,
      text: shareText,
      url: productUrl
    }).catch(() => {
      copyToClipboard(productUrl);
    });
  } else {
    copyToClipboard(productUrl);
  }

  return productUrl;
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  hapticNotification('success');
}
