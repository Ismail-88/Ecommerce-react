import { useEffect } from "react";
import { MessageSquarePlus, Star } from "lucide-react";
import useProductReviews from "../../hooks/useProductReviews";
import RatingOverview from './RatingOverview';
import AIReviewSummary from './AIReviewSummary';
import ReviewFilters from './ReviewFilters';
import ReviewCard from './ReviewCard';
import WriteReviewModal from './WriteReviewModal';

import Button from '../../../../../components/ui/Button';
import EmptyState from '../../../../../components/ui/EmptyState';

const ProductReviews = ({ productId, productTitle, currentUser }) => {
  const {
    reviews,
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
  } = useProductReviews(productId, currentUser);

  useEffect(() => {
    fetchReviews();
  }, [currentUser, fetchReviews]);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
        <Button
          onClick={() => {
            if (!currentUser) {
              alert("Please login");
              return;
            }
            setEditingReview(null);
            setIsModalOpen(true);
          }}
        >
          <MessageSquarePlus size={17} aria-hidden />
          Write a Review
        </Button>
      </div>

      <RatingOverview stats={stats} onFilterChange={setFilterRating} activeFilter={filterRating} />
      <AIReviewSummary reviews={reviews} />
      <ReviewFilters
        activeFilter={filterRating}
        onFilterChange={setFilterRating}
        activeSort={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-border border-t-brand-500 rounded-full animate-spin"></div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No reviews yet"
          description="Be the first to review!"
        />
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
