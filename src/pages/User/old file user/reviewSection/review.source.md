// ============================================
// 📁 components/product/RatingOverview.jsx
// ============================================
import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingOverview = ({ stats, onFilterChange, activeFilter }) => {
  return (
    <div className="bg-white border rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ratings & Reviews</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Rating */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800">{stats.average}</div>
            <div className="flex items-center justify-center gap-1 text-yellow-500 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {stats.total.toLocaleString()} ratings
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div
              key={star}
              onClick={() => onFilterChange(star)}
              className={`flex items-center gap-3 cursor-pointer group ${
                activeFilter === star ? 'bg-blue-50 rounded px-2 py-1' : ''
              }`}
            >
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{star}</span>
                <FaStar className="text-yellow-500 text-xs" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all"
                  style={{
                    width: `${stats.total > 0 ? (stats.distribution[index] / stats.total) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {stats.distribution[index].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;


// ============================================
// 📁 components/product/ReviewFilters.jsx
// ============================================
import React from 'react';

const ReviewFilters = ({ activeFilter, onFilterChange, activeSort, onSortChange }) => {
  const filters = [
    { value: 0, label: 'All' },
    { value: 5, label: '5★' },
    { value: 4, label: '4★' },
    { value: 3, label: '3★' },
    { value: 2, label: '2★' },
    { value: 1, label: '1★' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  return (
    <div className="bg-white border rounded-lg p-4 mb-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter Section */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Filter:</span>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onFilterChange(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  activeFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 hidden md:block" />

        {/* Sort Section */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Sort:</span>
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;


// ============================================
// 📁 components/product/ReviewCard.jsx
// ============================================
import React from 'react';
import { FaStar, FaThumbsUp, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const ReviewCard = ({ review, currentUser, onLike, onEdit, onDelete }) => {
  const isOwner = currentUser && currentUser._id === review.userId?._id;
  const hasLiked = currentUser && review.likes?.includes(currentUser._id);

  return (
    <div className="bg-white border rounded-lg p-4 mb-4 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {review.userId?.profileImage ? (
            <img
              src={review.userId.profileImage}
              alt={review.userId.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {review.userId?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1">
          {/* User Info & Actions */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800">{review.userId?.name || 'Anonymous'}</h4>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <FaCheckCircle />
                    Certified Buyer
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                  {review.rating} <FaStar className="text-xs" />
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(review)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(review._id)}
                  className="text-red-600 hover:text-red-700 p-1"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          {/* Review Title */}
          {review.title && (
            <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
          )}

          {/* Review Comment */}
          <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>

          {/* Review Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-3">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Review ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          )}

          {/* Review Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(review._id)}
              disabled={!currentUser}
              className={`flex items-center gap-2 text-sm ${
                hasLiked
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              } transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FaThumbsUp className={hasLiked ? 'text-blue-600' : ''} />
              Helpful ({review.likes?.length || 0})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;


// ============================================
// 📁 components/product/WriteReviewModal.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

const WriteReviewModal = ({ isOpen, onClose, onSubmit, editingReview, productTitle }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setTitle(editingReview.title || '');
      setComment(editingReview.comment);
    } else {
      setRating(0);
      setTitle('');
      setComment('');
    }
  }, [editingReview]);

  const handleSubmit = () => {
    if (rating === 0 || comment.trim().length < 10) {
      alert('Please provide a rating and a review (minimum 10 characters)');
      return;
    }

    onSubmit({ rating, title, comment });
    setRating(0);
    setTitle('');
    setComment('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {editingReview ? 'Edit Your Review' : 'Rate this product'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <FaStar
                    className={`text-3xl ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Poor'}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Review Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                Minimum 10 characters required
              </span>
              <span className="text-xs text-gray-500">
                {comment.length}/1000
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || comment.trim().length < 10}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {editingReview ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;


// ============================================
// 📁 components/product/ProductReviews.jsx (MAIN)
// ============================================
import React, { useState, useEffect } from 'react';
import RatingOverview from './RatingOverview';
import ReviewFilters from './ReviewFilters';
import ReviewCard from './ReviewCard';
import WriteReviewModal from './WriteReviewModal';

const ProductReviews = ({ productId, productTitle, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`);
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const calculateRatingStats = () => {
    if (reviews.length === 0) return { average: 0, distribution: [0, 0, 0, 0, 0], total: 0 };

    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = (sum / total).toFixed(1);

    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[5 - review.rating]++;
    });

    return { average: parseFloat(average), distribution, total };
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = reviews;

    if (filterRating > 0) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'helpful':
        return filtered.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
      case 'highest':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return filtered.sort((a, b) => a.rating - b.rating);
      default:
        return filtered;
    }
  };

  const handleSubmitReview = async (reviewData) => {
    if (!currentUser) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const url = editingReview
        ? `http://localhost:5000/api/reviews/${editingReview._id}`
        : `http://localhost:5000/api/products/${productId}/reviews`;
      
      const method = editingReview ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: currentUser.clerkId || currentUser._id,
          ...reviewData
        })
      });

      if (response.ok) {
        alert(editingReview ? 'Review updated!' : 'Review submitted!');
        setIsModalOpen(false);
        setEditingReview(null);
        fetchReviews();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}?clerkId=${currentUser.clerkId || currentUser._id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        alert('Review deleted!');
        fetchReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const handleLikeReview = async (reviewId) => {
    if (!currentUser) {
      alert('Please login to like reviews');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/reviews/${reviewId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clerkId: currentUser.clerkId || currentUser._id })
      });
      fetchReviews();
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  const stats = calculateRatingStats();
  const filteredReviews = getFilteredAndSortedReviews();

  return (
    <div className="mt-6">
      {/* Header with Write Review Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <button
          onClick={() => {
            if (!currentUser) {
              alert('Please login to write a review');
              return;
            }
            setEditingReview(null);
            setIsModalOpen(true);
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Write a Review
        </button>
      </div>

      <RatingOverview
        stats={stats}
        onFilterChange={setFilterRating}
        activeFilter={filterRating}
      />

      <ReviewFilters
        activeFilter={filterRating}
        onFilterChange={setFilterRating}
        activeSort={sortBy}
        onSortChange={setSortBy}
      />

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12 text-gray-600">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">
            {filterRating > 0
              ? `No ${filterRating}-star reviews yet`
              : 'No reviews yet. Be the first to review!'}
          </p>
          <button
            onClick={() => {
              if (!currentUser) {
                alert('Please login to write a review');
                return;
              }
              setIsModalOpen(true);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Write the First Review
          </button>
        </div>
      ) : (
        <div>
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUser={currentUser}
              onLike={handleLikeReview}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
      )}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingReview(null);
        }}
        onSubmit={handleSubmitReview}
        editingReview={editingReview}
        productTitle={productTitle}
      />
    </div>
  );
};

export default ProductReviews;


// ============================================
// 📝 Add to SingleProduct.jsx
// ============================================
/*
import ProductReviews from '../../components/product/ProductReviews';

// Add before closing div tag (after RelatedProducts):
<ProductReviews 
  productId={id} 
  productTitle={singleProduct.title}
  currentUser={currentUser} // Pass your current user from context/Clerk
/>
*/