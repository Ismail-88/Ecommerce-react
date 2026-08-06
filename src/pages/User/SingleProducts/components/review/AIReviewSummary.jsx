import { useMemo } from "react";
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { getReviewSummary, buildReviewSummaryText } from "../../../../../utils/aiEngine";
import Badge from "../../../../../components/ui/Badge";

const toneMap = {
  "Very Positive": "success",
  "Positive": "success",
  "Mixed": "warning",
  "Negative": "danger",
  "Very Negative": "danger",
};

const AIReviewSummary = ({ reviews }) => {
  const summary = useMemo(() => getReviewSummary(reviews), [reviews]);

  if (!summary || summary.count === 0) return null;

  return (
    <div className="rounded-2xl border border-brand-500/25 bg-gradient-to-br from-brand-soft to-surface p-5 mb-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/30">
          <Sparkles size={16} aria-hidden />
        </span>
        <div>
          <h3 className="font-bold text-foreground">AI Review Summary</h3>
          <p className="text-[11px] text-text-muted">
            Auto-generated from {summary.count} review{summary.count > 1 ? "s" : ""}
          </p>
        </div>
        <Badge tone={toneMap[summary.label]} className="ml-auto">
          Sentiment: {summary.label}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-xs font-bold text-text-muted">
          <ThumbsUp size={13} className="text-success" aria-hidden />
          {summary.positive} positive
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-text-muted">
          <ThumbsDown size={13} className="text-danger" aria-hidden />
          {summary.negative} negative
        </div>
        <div className="w-px h-4 bg-border" aria-hidden />
        <div className="flex-1 h-2 rounded-full bg-surface-alt overflow-hidden">
          <div
            className={`h-full rounded-full ${
              summary.score >= 55 ? "bg-success" : summary.score >= 40 ? "bg-warning" : "bg-danger"
            }`}
            style={{ width: `${Math.max(summary.score, 4)}%` }}
            title={`${summary.score}% positive`}
          />
        </div>
      </div>

      {summary.themes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {summary.themes.map((t) => (
            <span
              key={t.term}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border text-foreground/80"
            >
              {t.term} <span className="text-text-faint">· {t.count}</span>
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-foreground/80 leading-relaxed">{buildReviewSummaryText(summary)}</p>
    </div>
  );
};

export default AIReviewSummary;
