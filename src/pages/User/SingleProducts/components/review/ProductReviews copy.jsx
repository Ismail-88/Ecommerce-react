// import React, { useState, useEffect } from 'react';
// import RatingOverview from './RatingOverview';
// import ReviewFilters from './ReviewFilters';
// import ReviewCard from './ReviewCard';
// import WriteReviewModal from './WriteReviewModal';

// const ProductReviews = ({ productId, productTitle, currentUser }) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterRating, setFilterRating] = useState(0);
//   const [sortBy, setSortBy] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingReview, setEditingReview] = useState(null);

//   useEffect(() => {
//     fetchReviews();
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`);
//       const data = await response.json();
//       setReviews(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       setLoading(false);
//     }
//   };

//   const calculateRatingStats = () => {
//     if (reviews.length === 0) return { average: 0, distribution: [0, 0, 0, 0, 0], total: 0 };
//     const total = reviews.length;
//     const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
//     const average = (sum / total).toFixed(1);
//     const distribution = [0, 0, 0, 0, 0];
//     reviews.forEach(review => {
//       distribution[5 - review.rating]++;
//     });
//     return { average: parseFloat(average), distribution, total };
//   };

//   const getFilteredAndSortedReviews = () => {
//     let filtered = reviews;
//     if (filterRating > 0) {
//       filtered = filtered.filter(review => review.rating === filterRating);
//     }
//     switch (sortBy) {
//       case 'recent':
//         return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       case 'helpful':
//         return filtered.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
//       case 'highest':
//         return filtered.sort((a, b) => b.rating - a.rating);
//       case 'lowest':
//         return filtered.sort((a, b) => a.rating - b.rating);
//       default:
//         return filtered;
//     }
//   };

//   const handleSubmitReview = async (reviewData) => {
//     if (!currentUser) {
//       alert('Please login to submit a review');
//       return;
//     }

//     try {
//       let url, method;
      
//       if (editingReview) {
//         // Edit mode - make sure _id exists and is clean
//         const reviewId = editingReview._id || editingReview.id;
//         // console.log('Editing review ID:', reviewId);
//         url = `http://localhost:5000/api/reviews/${reviewId}`;
//         method = 'PUT';
//       } else {
//         // Create mode
//         // console.log('Creating new review for product:', productId);
//         url = `http://localhost:5000/api/products/${productId}/reviews`;
//         method = 'POST';
//       }

//     //   console.log('Request URL:', url);
//     //   console.log('Request method:', method);

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           clerkId: currentUser?.clerkId || currentUser?.id || currentUser?._id,
//           ...reviewData
//         })
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Success:', result);
//         alert(editingReview ? 'Review updated!' : 'Review submitted!');
//         setIsModalOpen(false);
//         setEditingReview(null);
//         fetchReviews();
//       } else {
//         const error = await response.json();
//         console.error('Server error:', error);
//         alert(error.message || 'Failed to submit review');
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('Failed to submit review: ' + error.message);
//     }
//   };

//   const handleEditReview = (review) => {
//     // console.log('=== EDIT REVIEW CLICKED ===');
//     // console.log('Full review object:', review);
//     // console.log('Review ID:', review._id);
//     // console.log('Review rating:', review.rating);
//     // console.log('Review title:', review.title);
//     // console.log('Review comment:', review.comment);
//     // console.log('Review images:', review.images);
    
//     if (!review._id) {
//       alert('Error: Review ID is missing!');
//       return;
//     }
    
//     setEditingReview(review);
//     setIsModalOpen(true);
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (!window.confirm('Are you sure you want to delete this review?')) return;
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/reviews/${reviewId}?clerkId=${currentUser.clerkId || currentUser._id}`,
//         { method: 'DELETE' }
//       );
//       if (response.ok) {
//         alert('Review deleted!');
//         fetchReviews();
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       alert('Failed to delete review');
//     }
//   };

//   const handleLikeReview = async (reviewId) => {
//     //  console.log("Current user:", currentUser); // 👈 check this
//     if (!currentUser) {
//       alert('Please login to like reviews');
//       return;
//     }
//    try {
//     const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/like`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         clerkId: currentUser?.id,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error('Error:', data.message);
//       alert(data.message);
//       return;
//     }

//     // console.log(data.message);
//     fetchReviews(); // refresh UI
//   } catch (error) {
//     console.error('Error liking review:', error);
//   }
//   };

//   const handleOpenWriteModal = () => {
//     // console.log('Opening write review modal');
//     if (!currentUser) {
//       alert('Please login to write a review');
//       return;
//     }
//     setEditingReview(null);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     // console.log('Closing modal');
//     setIsModalOpen(false);
//     setEditingReview(null);
//   };

//   const stats = calculateRatingStats();
//   const filteredReviews = getFilteredAndSortedReviews();

// return (
//     <div className="mt-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
//         <button
//           onClick={handleOpenWriteModal}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
//         >
//           Write a Review
//         </button>
//       </div>

//       <RatingOverview
//         stats={stats}
//         onFilterChange={setFilterRating}
//         activeFilter={filterRating}
//       />

//       <ReviewFilters
//         activeFilter={filterRating}
//         onFilterChange={setFilterRating}
//         activeSort={sortBy}
//         onSortChange={setSortBy}
//       />

//       {loading ? (
//         <div className="text-center py-12 text-gray-600">Loading reviews...</div>
//       ) : filteredReviews.length === 0 ? (
//         <div className="bg-white border border-gray-200 shadow-xl rounded-lg p-12 text-center">
//           <p className="text-gray-600 mb-4">
//             {filterRating > 0
//               ? `No ${filterRating}-star reviews yet`
//               : 'No reviews yet. Be the first to review!'}
//           </p>
//           <button
//             onClick={handleOpenWriteModal}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
//           >
//             Write the First Review
//           </button>
//         </div>
//       ) : (
//         <div>
//           {filteredReviews.map((review) => (
//             <ReviewCard
//               key={review._id}
//               review={review}
//               currentUser={currentUser}
//               onLike={handleLikeReview}
//               onEdit={handleEditReview}
//               onDelete={handleDeleteReview}
//             />
//           ))}
//         </div>
//       )}

//       <WriteReviewModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleSubmitReview}
//         editingReview={editingReview}
//         productTitle={productTitle}
//       />

//       {/* <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
//         <p className="text-sm text-blue-800">
//           <strong>Debug:</strong> Modal is {isModalOpen ? 'OPEN' : 'CLOSED'}
//           {editingReview && ' (Edit Mode)'}
//         </p>
//       </div> */}
//     </div>
//   );
// };


// export default ProductReviews;




import { CheckCircle, Edit2, Star, ThumbsUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import WriteReviewModal from "./WriteReviewModal";
import RatingOverview from "./RatingOverview";
import ReviewFilters from "./ReviewFilters";
import ReviewCard from "./ReviewCard";
import useProductReviews from "./hooks/useProductReviews";

const ProductReviews = ({ productId, productTitle, currentUser }) => {
  // pass productId & currentUser to hook
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

  // If you want to refresh reviews when currentUser changes (optional)
  useEffect(() => {
    // e.g. refresh likes state when user changes
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