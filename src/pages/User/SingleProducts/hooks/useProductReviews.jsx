import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_BASE = "http://localhost:5000";

export default function useProductReviews(productId, currentUser, baseUrl = DEFAULT_BASE) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // fetch reviews (memoized)
  const fetchReviews = useCallback(async (signal) => {
    setLoading(true);
    try {
      const resp = await fetch(`${baseUrl}/api/products/${productId}/reviews`, { signal });
      if (!resp.ok) {
        // try to parse error gracefully
        const err = await resp.json().catch(() => ({ message: "Failed to fetch reviews" }));
        console.error("Fetch reviews error:", err);
        setReviews([]);
        setLoading(false);
        return;
      }
      const data = await resp.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Error fetching reviews:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [productId, baseUrl]);

  useEffect(() => {
    if (!productId) {
      setReviews([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    fetchReviews(controller.signal);
    return () => controller.abort();
  }, [productId, fetchReviews]);

  // rating stats
  const stats = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, distribution: [0, 0, 0, 0, 0], total: 0 };
    }
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    const average = parseFloat((sum / total).toFixed(1));
    const distribution = [0, 0, 0, 0, 0]; // index 0 -> 5-star ... index 4 -> 1-star
    reviews.forEach((r) => {
      const rating = Number(r.rating) || 0;
      const idx = 5 - rating;
      if (idx >= 0 && idx < 5) distribution[idx] += 1;
    });
    return { average, distribution, total };
  }, [reviews]);

  // filtered & sorted reviews (returns a NEW array)
  const filteredReviews = useMemo(() => {
    let arr = Array.from(reviews);
    if (filterRating > 0) {
      arr = arr.filter((r) => Number(r.rating) === Number(filterRating));
    }
    switch (sortBy) {
      case "recent":
        return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "helpful":
        return arr.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
      case "highest":
        return arr.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return arr.sort((a, b) => a.rating - b.rating);
      default:
        return arr;
    }
  }, [reviews, filterRating, sortBy]);

  // submit (create/update) review
  const handleSubmitReview = useCallback(async (reviewData) => {
    if (!currentUser) {
      alert("Please login to submit a review");
      return;
    }

    try {
      let url;
      let method;
      if (editingReview) {
        const reviewId = editingReview._id || editingReview.id;
        url = `${baseUrl}/api/reviews/${reviewId}`;
        method = "PUT";
      } else {
        url = `${baseUrl}/api/products/${productId}/reviews`;
        method = "POST";
      }

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: currentUser?.clerkId || currentUser?.id || currentUser?._id,
          ...reviewData,
        }),
      });

      if (resp.ok) {
        alert(editingReview ? "Review updated!" : "Review submitted!");
        setIsModalOpen(false);
        setEditingReview(null);
        fetchReviews();
      } else {
        const err = await resp.json().catch(() => ({ message: "Failed to submit review" }));
        alert(err.message || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review: " + (err.message || err));
    }
  }, [currentUser, editingReview, productId, baseUrl, fetchReviews]);

  // edit flow
  const handleEditReview = useCallback((review) => {
    if (!review || (!review._id && !review.id)) {
      alert("Error: Review ID is missing!");
      return;
    }
    setEditingReview(review);
    setIsModalOpen(true);
  }, []);

  // delete review
  const handleDeleteReview = useCallback(async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const clerkId = currentUser?.clerkId || currentUser?._id || currentUser?.id;
      const resp = await fetch(`${baseUrl}/api/reviews/${reviewId}?clerkId=${clerkId}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        alert("Review deleted!");
        fetchReviews();
      } else {
        const err = await resp.json().catch(() => ({ message: "Failed to delete" }));
        alert(err.message || "Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  }, [currentUser, baseUrl, fetchReviews]);

  // like review
  const handleLikeReview = useCallback(async (reviewId) => {
    if (!currentUser) {
      alert("Please login to like reviews");
      return;
    }
    try {
      const resp = await fetch(`${baseUrl}/api/reviews/${reviewId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: currentUser?.id || currentUser?._id || currentUser?.clerkId }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        alert(data.message || "Unable to like review");
        return;
      }
      fetchReviews();
    } catch (err) {
      console.error("Error liking review:", err);
    }
  }, [currentUser, baseUrl, fetchReviews]);

  // expose API
  return {
    reviews,
    loading,
    filterRating,
    setFilterRating,
    sortBy,
    setSortBy,
    isModalOpen,
    setIsModalOpen,
    editingReview,
    setEditingReview,
    fetchReviews,
    stats,
    filteredReviews,
    handleSubmitReview,
    handleEditReview,
    handleDeleteReview,
    handleLikeReview,
  };
}
