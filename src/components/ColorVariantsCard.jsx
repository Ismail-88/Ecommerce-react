import { useState } from "react";
import { Palette, Plus, X, Upload, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../context/DataContext";

import Button from "./ui/Button";
import SectionCard from "./ui/erp/SectionCard";

const inputClass =
  "w-full px-3.5 py-2.5 border border-border bg-input-bg text-foreground rounded-lg outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm";

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

  return (
    <SectionCard
      icon={Palette}
      tone="brand"
      title="Color Variants"
      description="Add color options with images — this step is optional, you can skip it"
      action={
        <Button type="button" variant="secondary" onClick={() => setShowAddColor(!showAddColor)}>
          <Plus size={16} aria-hidden />
          Add Color
        </Button>
      }
    >
      {colors.length > 0 && (
        <div className="space-y-3">
          {colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className="border border-border rounded-lg p-4 space-y-3 bg-surface-alt"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{color.name}</p>
                    <p className="text-xs text-text-muted">{color.hex}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(colorIndex)}
                  className="p-1.5 text-danger hover:bg-danger-soft rounded-lg transition-colors"
                  aria-label={`Remove ${color.name}`}
                >
                  <Trash2 size={16} aria-hidden />
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
                        className="w-full h-20 object-cover rounded-lg border border-border bg-surface"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingColorImage(colorIndex, imgIndex)}
                        className="absolute -top-2 -right-2 bg-danger text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
                        aria-label="Remove image"
                      >
                        <X size={11} aria-hidden />
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
        <div className="border border-brand-500/40 rounded-lg p-5 space-y-4 bg-brand-soft">
          <h3 className="font-bold text-foreground text-sm">Add New Color</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">
                Color Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={newColor.name}
                onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                className={inputClass}
                placeholder="e.g., Brilliant Blue"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">
                Color Code <span className="text-danger">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newColor.hex}
                  onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                  className="w-14 h-[42px] border border-border bg-surface rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={newColor.hex}
                  onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                  className={inputClass}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Color Images <span className="text-danger">*</span>
            </label>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-brand-500/50 transition-colors bg-surface">
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
                  imagePreview.length >= 4 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="mx-auto text-text-faint mb-2" size={28} aria-hidden />
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
                      className="w-full h-20 object-cover rounded-lg border border-border bg-surface"
                    />
                    <button
                      type="button"
                      onClick={() => removeColorImage(index)}
                      className="absolute -top-2 -right-2 bg-danger text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
                      aria-label="Remove preview"
                    >
                      <X size={11} aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-1">
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
          <Palette className="mx-auto mb-3 text-text-faint" size={36} aria-hidden />
          <p className="font-semibold text-foreground text-sm">No color variants added yet</p>
          <p className="text-xs mt-1">
            Click "Add Color" to create color options, or press Next to skip this step
          </p>
        </div>
      )}
    </SectionCard>
  );
};
