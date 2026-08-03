import { Camera, Star, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import Modal from '../../../../../components/ui/Modal';
import Button from '../../../../../components/ui/Button';

const WriteReviewModal = ({ isOpen, onClose, onSubmit, editingReview, productTitle }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setTitle(editingReview.title || "");
      setComment(editingReview.comment || "");
      setExistingImages(editingReview.images || []);
      setNewImages([]);
    } else {
      setRating(0);
      setTitle("");
      setComment("");
      setExistingImages([]);
      setNewImages([]);
    }
  }, [editingReview, isOpen]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim().length < 10) {
      alert("Please provide a rating and a review (minimum 10 characters)");
      return;
    }

    const newImagePromises = newImages.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    try {
      const newImageBase64 = await Promise.all(newImagePromises);
      const allImages = [...existingImages, ...newImageBase64];

      onSubmit({
        rating,
        title,
        comment,
        images: allImages,
      });

      setRating(0);
      setTitle("");
      setComment("");
      setExistingImages([]);
      setNewImages([]);
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Failed to process images");
    }
  };

  const allImages = [
    ...existingImages.map((url, i) => ({ type: 'existing', url, index: i })),
    ...newImages.map((file, i) => ({ type: 'new', file, index: i }))
  ];

  const ratingLabels = {
    5: "Excellent!",
    4: "Very Good",
    3: "Good",
    2: "Fair",
    1: "Poor"
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="lg"
      title={editingReview ? "Edit Your Review" : "Rate this Product"}
      description={productTitle}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || comment.trim().length < 10}
          >
            {editingReview ? "Update Review" : "Submit Review"}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
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
                className="transition-all hover:scale-110"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  size={36}
                  className={`transition-all ${
                    star <= (hoverRating || rating)
                      ? "fill-warning text-warning"
                      : "text-border"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-brand-600 dark:text-brand-400 font-semibold">
              {ratingLabels[rating]}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Review Title (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            maxLength={100}
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-text-muted">Minimum 10 characters</span>
            <span className="text-xs text-text-muted">{comment.length}/1000</span>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Upload Images (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="review-images"
            />
            <label
              htmlFor="review-images"
              className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-xl border-2 border-dashed border-border bg-surface-alt hover:border-brand-500/50 hover:bg-surface-hover cursor-pointer transition-all"
            >
              <Camera size={20} className="text-text-muted" aria-hidden />
              <span className="font-semibold text-text-muted">Click to upload images</span>
            </label>
          </div>

          {allImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {allImages.map((img, index) => {
                const src = img.type === 'existing'
                  ? img.url
                  : URL.createObjectURL(img.file);

                return (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                    <img src={src} alt="preview" className="w-24 h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        if (img.type === 'existing') {
                          removeExistingImage(img.index);
                        } else {
                          removeNewImage(img.index);
                        }
                      }}
                      aria-label="Remove image"
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-overlay text-white hover:bg-danger transition-colors"
                    >
                      <X size={12} aria-hidden />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WriteReviewModal;
