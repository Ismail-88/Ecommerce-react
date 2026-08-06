const STOPWORDS = new Set([
  "the", "and", "for", "with", "this", "that", "from", "are", "was", "were",
  "been", "but", "not", "you", "your", "our", "they", "them", "have", "has",
  "had", "its", "into", "over", "under", "than", "then", "when", "where",
  "what", "which", "will", "would", "should", "could", "very", "just",
  "about", "their", "there", "here", "also", "like", "out", "all", "can",
  "because", "get", "got", "one", "two", "way", "really", "pretty", "much",
  "some", "more", "most", "other", "only", "even", "back", "still",
]);

const POSITIVE_WORDS = new Set([
  "good", "great", "excellent", "amazing", "awesome", "perfect", "love",
  "loved", "best", "nice", "happy", "recommend", "worth", "quality",
  "comfortable", "fast", "beautiful", "superb", "outstanding", "fantastic",
  "solid", "premium", "durable", "value", "impressed", "wonderful", "easy",
  "clean", "stylish", "bright", "soft", "strong", "fits", "working",
]);

const NEGATIVE_WORDS = new Set([
  "bad", "poor", "worst", "awful", "terrible", "disappointed", "waste",
  "useless", "broken", "defective", "faulty", "cheap", "slow", "issue",
  "problem", "returned", "refund", "damaged", "damage", "uncomfortable",
  "hate", "flimsy", "noise", "noisy", "leak", "stopped", "cracked",
  "overpriced", "worse", "awful", "annoying",
]);

const normalize = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (text) => normalize(text).split(" ").filter(Boolean);

const productTerms = (product) => {
  const terms = new Map();
  const add = (text, weight) => {
    tokenize(text).forEach((token) => {
      if (STOPWORDS.has(token)) return;
      terms.set(token, Math.max(terms.get(token) || 0, weight));
    });
  };
  add(product?.title, 3);
  add(product?.category?.name, 2);
  add(product?.brand, 2);
  add((product?.tags || []).join(" "), 2);
  add(product?.description, 1);
  return terms;
};

const cosineSimilarity = (termsA, termsB) => {
  if (!termsA.size || !termsB.size) return 0;
  let dot = 0;
  for (const [term, weight] of termsA) {
    if (termsB.has(term)) dot += weight * termsB.get(term);
  }
  let normA = 0;
  for (const weight of termsA.values()) normA += weight * weight;
  let normB = 0;
  for (const weight of termsB.values()) normB += weight * weight;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
};

const getYouMayAlsoLike = (products, seed, limit = 4) => {
  if (!seed || !products?.length) return [];
  const seedTerms = productTerms(seed);
  return products
    .filter((p) => p._id !== seed._id)
    .map((p) => {
      let score = cosineSimilarity(seedTerms, productTerms(p));
      if (p.category?.name && p.category.name === seed.category?.name) score += 0.5;
      const priceDiff = Math.abs((p.price || 0) - (seed.price || 0));
      if (priceDiff <= (seed.price || 1) * 0.25) score += 0.25;
      return { product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.product);
};

const getFrequentlyBoughtTogether = (orders, seed, products, limit = 4) => {
  if (!seed || !orders?.length || !products?.length) return [];
  const seedId = seed._id;
  const counts = new Map();
  orders.forEach((order) => {
    const items = order?.items || [];
    const boughtWithSeed = items.some((it) => (it._id || it.productId) === seedId);
    if (!boughtWithSeed) return;
    items.forEach((it) => {
      const id = it._id || it.productId;
      if (!id || id === seedId) return;
      counts.set(id, (counts.get(id) || 0) + 1);
    });
  });
  if (!counts.size) return [];
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => products.find((p) => p._id === id))
    .filter(Boolean);
};

const searchProducts = (products, query, limit = 8) => {
  const q = normalize(query);
  if (q.length < 2) return [];
  const queryTerms = q.split(" ").filter((t) => !STOPWORDS.has(t));
  if (!queryTerms.length) queryTerms.push(q);
  const scored = [];
  products.forEach((p) => {
    let score = 0;
    const title = normalize(p.title);
    const category = normalize(p.category?.name);
    const brand = normalize(p.brand);
    const description = normalize(p.description);
    queryTerms.forEach((term) => {
      if (title === q) score += 15;
      if (title.startsWith(term)) score += 10;
      if (title.includes(term)) score += 7;
      if (category === term) score += 6;
      if (category.includes(term)) score += 4;
      if (brand.includes(term)) score += 3;
      if (description.includes(term)) score += 1;
    });
    if (score > 0) scored.push({ product: p, score });
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.product);
};

const getReviewSummary = (reviews) => {
  if (!reviews?.length) return null;
  const texts = reviews.map((r) => `${r.title || ""} ${r.comment || ""}`).join(" ");
  const freq = new Map();
  tokenize(texts).forEach((token) => {
    if (STOPWORDS.has(token) || token.length < 4) return;
    freq.set(token, (freq.get(token) || 0) + 1);
  });
  const themes = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([term, count]) => ({ term, count }));

  let positive = 0;
  let negative = 0;
  let neutral = 0;
  reviews.forEach((r) => {
    const rating = Number(r.rating) || 0;
    if (rating >= 4) positive++;
    else if (rating <= 2) negative++;
    else neutral++;
  });

  const count = reviews.length;
  const positivePct = positive / count;
  const negativePct = negative / count;

  let label = "Mixed";
  if (positivePct >= 0.75) label = "Very Positive";
  else if (positivePct >= 0.55) label = "Positive";
  else if (negativePct >= 0.55) label = "Negative";
  else if (negativePct >= 0.75) label = "Very Negative";

  const score = Math.round(positivePct * 100);

  return { count, positive, negative, neutral, label, score, themes };
};

const buildReviewSummaryText = (summary) => {
  if (!summary) return "";
  const themes = summary.themes.slice(0, 3).map((t) => `"${t.term}"`).join(", ");
  if (summary.count === 1) {
    return themes
      ? `Based on a single review, buyers most frequently mention ${themes}.`
      : "There is not enough text to summarize this review.";
  }
  return `Across ${summary.count} reviews, ${summary.positive} were positive (${summary.score}%) while ${summary.negative} were negative. Reviewers most often mention ${themes}.`;
};

export {
  searchProducts,
  getYouMayAlsoLike,
  getFrequentlyBoughtTogether,
  getReviewSummary,
  buildReviewSummaryText,
};
export default {
  searchProducts,
  getYouMayAlsoLike,
  getFrequentlyBoughtTogether,
  getReviewSummary,
  buildReviewSummaryText,
};
