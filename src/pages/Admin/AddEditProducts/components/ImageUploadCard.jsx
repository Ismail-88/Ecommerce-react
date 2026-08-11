import { useRef, useState } from "react";
import { ImageIcon, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "../../../../context/DataContext";
import SectionCard from "../../../../components/ui/erp/SectionCard";

export const ImageUploadCard = ({
  imagePreview,
  onImageUpload,
  onRemoveImage,
  onMoveImage,
}) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;
    onImageUpload({ target: { files } });
  };

  const isMaxed = imagePreview.length >= 5;

  return (
    <SectionCard
      icon={ImageIcon}
      tone="brand"
      title="Media"
      description="Upload up to 5 images — the first one is used as the main image"
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
        id="product-image-upload"
        disabled={isMaxed}
      />

      <div
        onClick={() => !isMaxed && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? "border-brand-500 bg-brand-500/5"
            : "border-border bg-surface-alt hover:border-brand-500/50"
        } ${isMaxed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <Upload className="mx-auto text-text-faint mb-3" size={32} aria-hidden />
        <p className="text-sm font-semibold text-foreground mb-1">
          Click to upload or drag & drop images
        </p>
        <p className="text-xs text-text-muted">PNG, JPG, WEBP up to 10MB each</p>
      </div>

      {imagePreview.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {imagePreview.map((img, index) => (
            <div
              key={index}
              className="group relative rounded-lg border border-border bg-surface-alt overflow-hidden"
            >
              <img
                src={
                  typeof img === "string"
                    ? img.startsWith("/uploads")
                      ? `${API_BASE_URL}${img}`
                      : img
                    : URL.createObjectURL(img)
                }
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              <span className="absolute top-1.5 left-1.5 flex items-center justify-center w-5 h-5 rounded bg-black/60 text-white text-[11px] font-bold">
                {index + 1}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1.5 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onMoveImage(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move image ${index + 1} left`}
                  className="p-1 rounded bg-white/90 text-ink hover:bg-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={13} aria-hidden />
                </button>
                {index === 0 && (
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onMoveImage(index, 1)}
                  disabled={index === imagePreview.length - 1}
                  aria-label={`Move image ${index + 1} right`}
                  className="p-1 rounded bg-white/90 text-ink hover:bg-white disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={13} aria-hidden />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                aria-label={`Remove image ${index + 1}`}
                className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-danger text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={13} aria-hidden />
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};
