import { ImageIcon, Upload, X } from "lucide-react";
import { API_BASE_URL } from "../../../../context/DataContext";

export const ImageUploadCard = ({ imagePreview, onImageUpload, onRemoveImage }) => {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <ImageIcon size={24} aria-hidden />
        </span>
        <div>
          <h2 className="text-xl font-bold text-foreground">Product Images</h2>
          <p className="text-sm text-text-muted">
            Upload product photos (max 5 images)
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-brand-500/50 transition-colors bg-surface-alt">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
          id="image-upload"
          disabled={imagePreview.length >= 5}
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${
            imagePreview.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Upload className="mx-auto text-text-faint mb-4" size={48} aria-hidden />
          <p className="text-foreground font-semibold mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-text-muted">PNG, JPG, WEBP up to 10MB</p>
        </label>
      </div>

      {/* Image Preview Grid */}
      {imagePreview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {imagePreview.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={
                  typeof img === "string"
                    ? img.startsWith("/uploads")
                      ? `${API_BASE_URL}${img}`
                      : img
                    : URL.createObjectURL(img)
                }
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-xl border border-border bg-surface-alt"
              />

              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-danger text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-card hover:scale-110"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={16} aria-hidden />
              </button>

              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-success text-white text-xs px-2 py-1 rounded-lg font-bold">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
