
import { useEffect } from "react";
import useProductReviews from "../../hooks/useProductReviews";
import RatingOverview from './RatingOverview';
import ReviewFilters from './ReviewFilters';
import ReviewCard from './ReviewCard';
import WriteReviewModal from './WriteReviewModal';

const ProductReviews = ({ productId, productTitle, currentUser }) => {
  
  const {
    loading,
    stats,
    filteredReviews,
    filterRating,
    setFilterRating,
    sortBy,
    setSortBy,
    isModalOpen,
    setIsModalOpen,
    editingReview,
    setEditingReview,
    handleSubmitReview,
    handleEditReview,
    handleDeleteReview,
    handleLikeReview,
    fetchReviews,
  } = useProductReviews(productId, currentUser );

  useEffect(() => {
    fetchReviews();
  }, [currentUser, fetchReviews]);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Customer Reviews</h2>
        <button
          onClick={() => {
            if (!currentUser) {
              alert("Please login");
              return;
            }
            setEditingReview(null);
            setIsModalOpen(true);
          }}
          className="relative overflow-hidden group rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
          <span className="relative block px-8 py-3 text-white font-bold">Write a Review</span>
        </button>
      </div>

      <RatingOverview stats={stats} onFilterChange={setFilterRating} activeFilter={filterRating} />
      <ReviewFilters
        activeFilter={filterRating}
        onFilterChange={setFilterRating}
        activeSort={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-16 text-center">
          <div className="text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-bold mb-3">No reviews yet</h3>
          <p className="text-gray-400 mb-8">Be the first to review!</p>
        </div>
      ) : (
        <div>
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review._id || review.id}
              review={review}
              currentUser={currentUser}
              onLike={() => handleLikeReview(review._id || review.id)}
              onEdit={() => handleEditReview(review)}
              onDelete={() => handleDeleteReview(review._id || review.id)}
            />
          ))}
        </div>
      )}

      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
        editingReview={editingReview}
        productTitle={productTitle}
      />
    </div>
  );
};


export default ProductReviews;