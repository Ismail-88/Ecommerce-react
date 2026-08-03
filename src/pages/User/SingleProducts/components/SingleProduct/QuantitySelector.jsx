import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, setQuantity, max = 10 }) => {
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(max, q + 1));

  return (
    <div className="inline-flex items-center rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex items-center justify-center w-11 h-11 text-text-muted hover:text-foreground hover:bg-surface-hover disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
      >
        <Minus size={16} aria-hidden />
      </button>
      <span
        className="w-12 text-center font-bold text-foreground text-base border-x border-border bg-surface-alt/50 h-11 flex items-center justify-center"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        onClick={increase}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex items-center justify-center w-11 h-11 text-text-muted hover:text-foreground hover:bg-surface-hover disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={16} aria-hidden />
      </button>
    </div>
  );
};

export default QuantitySelector;
