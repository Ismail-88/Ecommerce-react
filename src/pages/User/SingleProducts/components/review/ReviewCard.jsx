
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Edit2, Star, ThumbsUp, Trash2 } from 'lucide-react';

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
      <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6 mb-6 hover:border-white/20 transition-all">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {review.userId?.profileImage ? (
              <img src={review.userId.profileImage} alt={review.userId.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                {review.userId?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg">{review.userId?.name || 'Anonymous'}</h4>
                  {review.verified && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                    <span className="font-bold text-yellow-400">{review.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-sm text-gray-500">{formatTimeAgo(review.createdAt)}</span>
                </div>
              </div>
              {isOwner && (
                <div className="flex gap-2">
                  <button onClick={() => onEdit(review)} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                    <Edit2 className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button onClick={() => onDelete(review._id)} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              )}
            </div>
            {review.title && <h5 className="font-bold text-lg mb-2">{review.title}</h5>}
            <p className="text-gray-400 leading-relaxed mb-4">{review.comment}</p>
            {review.images && review.images.length > 0 && (
              <div className="flex gap-3 mb-4 flex-wrap">
                {review.images.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all" onClick={() => window.open(img, '_blank')}>
                    <img src={img} alt={`Review ${idx + 1}`} className="w-24 h-24 object-cover" />
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => onLike(review._id)} disabled={!currentUser} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${hasLiked ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}>
              <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-cyan-400' : ''}`} />
              Helpful ({review.likes?.length || 0})
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ReviewCard;