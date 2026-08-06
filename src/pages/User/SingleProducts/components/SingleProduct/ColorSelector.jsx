import { Check } from "lucide-react";

const ColorSelector = ({ colors, selectedColor, onColorChange }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <fieldset className="rounded-xl border border-border bg-surface p-5">
      <legend className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
        Select Color:{" "}
        <span className="text-foreground normal-case font-semibold">{selectedColor?.name}</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => {
          const active = selectedColor?.name === color.name;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onColorChange(color)}
              aria-label={`Select color ${color.name}`}
              aria-pressed={active}
              className={`relative w-12 h-12 rounded-xl border-2 transition-all ${
                active
                  ? "border-brand-600 ring-2 ring-brand-600/30"
                  : "border-border hover:border-border-strong"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {active && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-foreground">
                    <Check size={12} strokeWidth={3} aria-hidden />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ColorSelector;
