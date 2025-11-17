// ============================================
// 📁 components/product/ProductReviews.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import {
  Rating,
  Button,
  TextField,
  Avatar,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  Flag,
  Close,
  Edit,
  Delete,
  VerifiedUser
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const ProductReviews = ({ productId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('recent');
  const [editingReview, setEditingReview] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/product/${productId}`);
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser) {
      showSnackbar('Please login to submit a review', 'error');
      return;
    }

    if (rating === 0) {
      showSnackbar('Please select a rating', 'error');
      return;
    }

    if (reviewText.trim().length < 10) {
      showSnackbar('Review must be at least 10 characters', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = editingReview
        ? `http://localhost:5000/reviews/${editingReview._id}`
        : 'http://localhost:5000/reviews';
      
      const method = editingReview ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          rating,
          title: reviewTitle,
          comment: reviewText,
          userId: currentUser._id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar
        })
      });

      if (response.ok) {
        showSnackbar(
          editingReview ? 'Review updated successfully!' : 'Review submitted successfully!',
          'success'
        );
        resetForm();
        fetchReviews();
      } else {
        showSnackbar('Failed to submit review', 'error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showSnackbar('Failed to submit review', 'error');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setRating(review.rating);
    setReviewTitle(review.title || '');
    setReviewText(review.comment);
    setOpenReviewDialog(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        showSnackbar('Review deleted successfully!', 'success');
        fetchReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      showSnackbar('Failed to delete review', 'error');
    }
  };

  const handleLikeReview = async (reviewId) => {
    if (!currentUser) {
      showSnackbar('Please login to like reviews', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: currentUser._id })
      });

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  const handleReportReview = async (reviewId) => {
    if (!currentUser) {
      showSnackbar('Please login to report reviews', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: currentUser._id })
      });

      if (response.ok) {
        showSnackbar('Review reported successfully', 'success');
      }
    } catch (error) {
      console.error('Error reporting review:', error);
    }
  };

  const resetForm = () => {
    setOpenReviewDialog(false);
    setRating(0);
    setReviewTitle('');
    setReviewText('');
    setEditingReview(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
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

  const stats = calculateRatingStats();
  const filteredReviews = getFilteredAndSortedReviews();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenReviewDialog(true)}
          disabled={!currentUser}
        >
          Write a Review
        </Button>
      </div>

      {/* Rating Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-5xl font-bold text-gray-800">{stats.average}</span>
              <div>
                <Rating value={stats.average} precision={0.1} readOnly size="large" />
                <p className="text-sm text-gray-600 mt-1">{stats.total} reviews</p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{star} star</span>
                <LinearProgress
                  variant="determinate"
                  value={stats.total > 0 ? (stats.distribution[index] / stats.total) * 100 : 0}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <span className="text-sm text-gray-600 w-12 text-right">
                  {stats.distribution[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-gray-700">Filter by:</span>
          <div className="flex gap-2">
            <Chip
              label="All"
              onClick={() => setFilterRating(0)}
              color={filterRating === 0 ? 'error' : 'default'}
              variant={filterRating === 0 ? 'filled' : 'outlined'}
            />
            {[5, 4, 3, 2, 1].map(star => (
              <Chip
                key={star}
                label={`${star} ⭐`}
                onClick={() => setFilterRating(star)}
                color={filterRating === star ? 'error' : 'default'}
                variant={filterRating === star ? 'filled' : 'outlined'}
              />
            ))}
          </div>
          <Divider orientation="vertical" flexItem />
          <span className="text-sm font-semibold text-gray-700">Sort by:</span>
          <div className="flex gap-2">
            {[
              { value: 'recent', label: 'Most Recent' },
              { value: 'helpful', label: 'Most Helpful' },
              { value: 'highest', label: 'Highest Rating' },
              { value: 'lowest', label: 'Lowest Rating' }
            ].map(option => (
              <Chip
                key={option.value}
                label={option.label}
                onClick={() => setSortBy(option.value)}
                color={sortBy === option.value ? 'error' : 'default'}
                variant={sortBy === option.value ? 'filled' : 'outlined'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading reviews...</div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <Avatar
                  src={review.userAvatar}
                  alt={review.userName}
                  sx={{ width: 48, height: 48 }}
                >
                  {review.userName?.charAt(0).toUpperCase()}
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                        {review.verified && (
                          <Chip
                            icon={<VerifiedUser />}
                            label="Verified Purchase"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Rating value={review.rating} readOnly size="small" />
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    {currentUser && currentUser._id === review.userId && (
                      <div className="flex gap-1">
                        <IconButton
                          size="small"
                          onClick={() => handleEditReview(review)}
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteReview(review._id)}
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </div>
                    )}
                  </div>

                  {review.title && (
                    <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
                  )}

                  <p className="text-gray-600 mb-3 leading-relaxed">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Review ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3">
                    <Button
                      size="small"
                      startIcon={
                        review.likes?.includes(currentUser?._id) ? (
                          <ThumbUp />
                        ) : (
                          <ThumbUpOutlined />
                        )
                      }
                      onClick={() => handleLikeReview(review._id)}
                      disabled={!currentUser}
                    >
                      Helpful ({review.likes?.length || 0})
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Flag />}
                      onClick={() => handleReportReview(review._id)}
                      disabled={!currentUser}
                      color="error"
                    >
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Dialog */}
      <Dialog
        open={openReviewDialog}
        onClose={resetForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <div className="flex items-center justify-between">
            <span>{editingReview ? 'Edit Review' : 'Write a Review'}</span>
            <IconButton onClick={resetForm}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                size="large"
              />
            </div>

            <TextField
              label="Review Title (Optional)"
              fullWidth
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Summarize your experience"
            />

            <TextField
              label="Your Review *"
              fullWidth
              multiline
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about this product..."
              helperText={`${reviewText.length}/500 characters`}
              inputProps={{ maxLength: 500 }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            color="error"
            disabled={rating === 0 || reviewText.trim().length < 10}
          >
            {editingReview ? 'Update Review' : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductReviews;


// ============================================
// 📁 Updated SingleProduct.jsx (Add this import and component)
// ============================================
/*
import ProductReviews from '../../components/product/ProductReviews';

// Inside SingleProduct component, before closing div:
<ProductReviews productId={id} currentUser={currentUser} />
*/


// ============================================
// 📁 Backend API Routes (Node.js/Express)
// ============================================
/*
// routes/reviews.js

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authenticateUser } = require('../middleware/auth');

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Create a review
router.post('/', authenticateUser, async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      userId: req.user._id,
      userName: req.user.name,
      userAvatar: req.user.avatar
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
});

// Update a review
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
});

// Delete a review
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// Like a review
router.post('/:id/like', authenticateUser, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const likeIndex = review.likes.indexOf(req.user._id);
    if (likeIndex > -1) {
      review.likes.splice(likeIndex, 1); // Unlike
    } else {
      review.likes.push(req.user._id); // Like
    }

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error liking review' });
  }
});

// Report a review
router.post('/:id/report', authenticateUser, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.reports.includes(req.user._id)) {
      review.reports.push(req.user._id);
      await review.save();
    }

    res.json({ message: 'Review reported' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting review' });
  }
});

module.exports = router;
*/


// ============================================
// 📁 Backend Model (MongoDB/Mongoose)
// ============================================
/*
// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: String,
  comment: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  images: [String],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
*/


// ============================================
// 📦 Required NPM Packages
// ============================================
/*
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material date-fns
*/