import { Camera, Star, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/98 to-black/98 backdrop-blur-3xl">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {editingReview ? "Edit Your Review" : "Rate this Product"}
            </h2>
            <p className="text-gray-400">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="relative p-8 space-y-8">
          {/* Rating */}
          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Your Rating *
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-all hover:scale-125"
                >
                  <Star
                    className={`w-12 h-12 transition-all ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-3 text-cyan-400 font-semibold">
                {ratingLabels[rating]}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Review Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={6}
              className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">Minimum 10 characters</span>
              <span className="text-xs text-gray-500">{comment.length}/1000</span>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
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
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer transition-all"
              >
                <Camera className="w-6 h-6 text-gray-400" />
                <span className="font-semibold text-gray-400">Click to upload images</span>
              </label>
            </div>

            {allImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {allImages.map((img, index) => {
                  const src = img.type === 'existing' 
                    ? img.url 
                    : URL.createObjectURL(img.file);
                  
                  return (
                    <div
                      key={index}
                      className="relative group rounded-2xl overflow-hidden border border-white/20"
                    >
                      <img
                        src={src}
                        alt="preview"
                        className="w-24 h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (img.type === 'existing') {
                            removeExistingImage(img.index);
                          } else {
                            removeNewImage(img.index);
                          }
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 hover:bg-red-500/80 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex gap-4 p-8 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 font-bold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || comment.trim().length < 10}
            className="flex-1 relative overflow-hidden group rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative block px-8 py-4 text-white font-bold">
              {editingReview ? "Update Review" : "Submit Review"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal 