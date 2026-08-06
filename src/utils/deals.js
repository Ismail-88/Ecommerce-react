// utils/deals.js
export const getDiscountPercent = (product) => {
  if (!product) return 0;
  if (product.discount && product.discount > 0) return product.discount;
  return 0;
};

export const isOnDeal = (product) => getDiscountPercent(product) > 0;

export const getDealProducts = (products) => {
  if (!Array.isArray(products)) return [];
  return products
    .filter(isOnDeal)
    .sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a));
};
