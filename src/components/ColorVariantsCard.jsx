import { useState } from "react";
import { Palette, Plus, X, Upload, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../context/DataContext";

import Button from "./ui/Button";

export const ColorVariantsCard = ({ colors, setColors }) => {
  const [showAddColor, setShowAddColor] = useState(false);
  const [newColor, setNewColor] = useState({
    name: "",
    hex: "#000000",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  const handleAddColor = () => {
    if (newColor.name && newColor.images.length > 0) {
      setColors([...colors, { ...newColor }]);
      setNewColor({ name: "", hex: "#000000", images: [] });
      setImagePreview([]);
      setShowAddColor(false);
    }
  };

  const handleRemoveColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const handleColorImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 4 - imagePreview.length;
    const filesToAdd = files.slice(0, remainingSlots);

    setImagePreview([...imagePreview, ...filesToAdd]);
    setNewColor({
      ...newColor,
      images: [...newColor.images, ...filesToAdd],
    });
  };

  const removeColorImage = (index) => {
    const updatedPreview = imagePreview.filter((_, i) => i !== index);
    const updatedImages = newColor.images.filter((_, i) => i !== index);
    setImagePreview(updatedPreview);
    setNewColor({ ...newColor, images: updatedImages });
  };

  const removeExistingColorImage = (colorIndex, imageIndex) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images = updatedColors[colorIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setColors(updatedColors);
  };

  const inputClass =
    "w-full px-4 py-3 border border-border bg-background text-foreground rounded-xl outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all";

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
            <Palette size={24} aria-hidden />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">Color Variants</h2>
            <p className="text-sm text-text-muted">
              Add different color options with images
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowAddColor(!showAddColor)}
        >
          <Plus size={20} aria-hidden />
          Add Color
        </Button>
      </div>

      {colors.length > 0 && (
        <div className="space-y-4">
          {colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className="border border-border rounded-xl p-4 space-y-3 bg-surface-alt"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="font-bold text-foreground">{color.name}</p>
                    <p className="text-sm text-text-muted">{color.hex}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(colorIndex)}
                  className="p-2 text-danger hover:bg-danger-soft rounded-lg transition"
                  aria-label={`Remove ${color.name}`}
                >
                  <Trash2 size={20} aria-hidden />
                </button>
              </div>

              {color.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {color.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative group">
                      <img
                        src={
                          typeof img === "string"
                            ? img.startsWith("/uploads")
                              ? `${API_BASE_URL}${img}`
                              : img
                            : URL.createObjectURL(img)
                        }
                        alt={`${color.name} ${imgIndex + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-border bg-surface"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeExistingColorImage(colorIndex, imgIndex)
                        }
                        className="absolute -top-2 -right-2 bg-danger text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
                        aria-label="Remove image"
                      >
                        <X size={12} aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showAddColor && (
        <div className="border border-brand-500/40 rounded-xl p-6 space-y-4 bg-brand-soft">
          <h3 className="font-bold text-foreground text-lg">Add New Color</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground">
                Color Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={newColor.name}
                onChange={(e) =>
                  setNewColor({ ...newColor, name: e.target.value })
                }
                className={inputClass}
                placeholder="e.g., Brilliant Blue"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground">
                Color Code <span className="text-danger">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newColor.hex}
                  onChange={(e) =>
                    setNewColor({ ...newColor, hex: e.target.value })
                  }
                  className="w-20 h-12 border border-border bg-surface rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={newColor.hex}
                  onChange={(e) =>
                    setNewColor({ ...newColor, hex: e.target.value })
                  }
                  className={inputClass}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">
              Color Images <span className="text-danger">*</span>
            </label>

            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-brand-500/50 transition-colors bg-surface">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleColorImageUpload}
                className="hidden"
                id="color-image-upload"
                disabled={imagePreview.length >= 4}
              />
              <label
                htmlFor="color-image-upload"
                className={`cursor-pointer ${
                  imagePreview.length >= 4
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Upload className="mx-auto text-text-faint mb-2" size={36} aria-hidden />
                <p className="text-foreground font-semibold text-sm">
                  Upload images for this color (max 4)
                </p>
              </label>
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {imagePreview.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-border bg-surface"
                    />
                    <button
                      type="button"
                      onClick={() => removeColorImage(index)}
                      className="absolute -top-2 -right-2 bg-danger text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
                      aria-label="Remove preview"
                    >
                      <X size={12} aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={handleAddColor}
              disabled={!newColor.name || newColor.images.length === 0}
              className="flex-1"
            >
              Add Color Variant
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowAddColor(false);
                setNewColor({ name: "", hex: "#000000", images: [] });
                setImagePreview([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {colors.length === 0 && !showAddColor && (
        <div className="text-center py-8 text-text-muted">
          <Palette className="mx-auto mb-3 text-text-faint" size={48} aria-hidden />
          <p className="font-semibold text-foreground">No color variants added yet</p>
          <p className="text-sm">Click "Add Color" to create color options</p>
        </div>
      )}
    </div>
  );
};
