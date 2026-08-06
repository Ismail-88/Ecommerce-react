// utils/recentlyViewed.js
const KEY = "shopsphere_recently_viewed";
const MAX = 12;

export const getRecentlyViewed = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const addToRecentlyViewed = (product) => {
  if (!product?._id) return getRecentlyViewed();
  const list = getRecentlyViewed().filter((p) => p._id !== product._id);
  list.unshift(product);
  const trimmed = list.slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    // ignore quota errors
  }
  return trimmed;
};
