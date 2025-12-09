import { useState } from "react";
import { Palette, Plus, X, Upload, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../context/DataContext";

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
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-pink-100 p-3 rounded-xl">
            <Palette className="text-pink-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Color Variants</h2>
            <p className="text-sm text-gray-500">
              Add different color options with images
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowAddColor(!showAddColor)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
        >
          <Plus size={20} />
          Add Color
        </button>
      </div>

      {colors.length > 0 && (
        <div className="space-y-4">
          {colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className="border-2 border-gray-200 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="font-bold text-gray-900">{color.name}</p>
                    <p className="text-sm text-gray-500">{color.hex}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(colorIndex)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={20} />
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
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeExistingColorImage(colorIndex, imgIndex)
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X size={12} />
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
        <div className="border-2 border-red-500 rounded-xl p-6 space-y-4 bg-red-50">
          <h3 className="font-bold text-gray-900 text-lg">Add New Color</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Color Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newColor.name}
                onChange={(e) =>
                  setNewColor({ ...newColor, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                placeholder="e.g., Brilliant Blue"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Color Code <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newColor.hex}
                  onChange={(e) =>
                    setNewColor({ ...newColor, hex: e.target.value })
                  }
                  className="w-20 h-12 border-2 border-gray-200 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={newColor.hex}
                  onChange={(e) =>
                    setNewColor({ ...newColor, hex: e.target.value })
                  }
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">
              Color Images <span className="text-red-500">*</span>
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-500 transition-colors">
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
                <Upload className="mx-auto text-gray-400 mb-2" size={36} />
                <p className="text-gray-700 font-semibold text-sm">
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
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeColorImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddColor}
              disabled={!newColor.name || newColor.images.length === 0}
              className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Color Variant
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddColor(false);
                setNewColor({ name: "", hex: "#000000", images: [] });
                setImagePreview([]);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {colors.length === 0 && !showAddColor && (
        <div className="text-center py-8 text-gray-500">
          <Palette className="mx-auto mb-3 text-gray-400" size={48} />
          <p className="font-semibold">No color variants added yet</p>
          <p className="text-sm">Click "Add Color" to create color options</p>
        </div>
      )}
    </div>
  );
};