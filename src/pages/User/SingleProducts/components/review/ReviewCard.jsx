import { CheckCircle, Edit2, Star, ThumbsUp, Trash2 } from 'lucide-react';

import Badge from '../../../../../components/ui/Badge';

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "just now";
};

const ReviewCard = ({ review, currentUser, onLike, onEdit, onDelete }) => {
  const isOwner = currentUser && (
    currentUser._id === review.userId?._id ||
    currentUser.clerkId === review.userId?.clerkId ||
    currentUser.clerkId === review.clerkId
  );

  const hasLiked = currentUser && (
    review.likes?.includes(currentUser._id) ||
    review.likes?.includes(currentUser.clerkId)
  );

  return (
    <div className="rounded-xl border border-border bg-surface p-6 mb-4 hover:border-border-strong transition-all">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {review.userId?.profileImage ? (
            <img
              src={review.userId.profileImage}
              alt={review.userId.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
              {review.userId?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                <h4 className="font-bold text-foreground">{review.userId?.name || 'Anonymous'}</h4>
                {review.verified && (
                  <Badge tone="success">
                    <CheckCircle size={12} aria-hidden />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-warning-soft border border-warning/20 px-2.5 py-1">
                  <span className="font-bold text-warning">{review.rating}</span>
                  <Star size={14} className="fill-warning text-warning" aria-hidden />
                </span>
                <span className="text-sm text-text-muted">{formatTimeAgo(review.createdAt)}</span>
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(review)}
                  aria-label="Edit review"
                  className="p-2 rounded-lg border border-border bg-surface-alt hover:border-brand-500/50 hover:text-brand-600 transition-all text-text-muted"
                >
                  <Edit2 size={16} aria-hidden />
                </button>
                <button
                  onClick={() => onDelete(review._id)}
                  aria-label="Delete review"
                  className="p-2 rounded-lg border border-border bg-surface-alt hover:border-danger/50 hover:text-danger transition-all text-text-muted"
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </div>
            )}
          </div>
          {review.title && <h5 className="font-bold text-foreground mb-1.5">{review.title}</h5>}
          <p className="text-text-muted leading-relaxed mb-4">{review.comment}</p>
          {review.images && review.images.length > 0 && (
            <div className="flex gap-3 mb-4 flex-wrap">
              {review.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden border border-border cursor-pointer hover:border-brand-500/50 transition-all"
                  onClick={() => window.open(img, '_blank')}
                >
                  <img src={img} alt={`Review ${idx + 1}`} className="w-24 h-24 object-cover" />
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => onLike(review._id)}
            disabled={!currentUser}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all border ${
              hasLiked
                ? 'bg-brand-soft border-brand-500/30 text-brand-600 dark:text-brand-400'
                : 'bg-surface-alt border-border text-text-muted hover:text-foreground'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ThumbsUp size={15} className={hasLiked ? 'fill-brand-500' : ''} aria-hidden />
            Helpful ({review.likes?.length || 0})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
