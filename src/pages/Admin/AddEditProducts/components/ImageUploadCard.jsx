import { ImageIcon, Upload, X } from "lucide-react";

export const ImageUploadCard = ({ imagePreview, onImageUpload, onRemoveImage }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-100 p-3 rounded-xl">
          <ImageIcon className="text-purple-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Product Images</h2>
          <p className="text-sm text-gray-500">
            Upload product photos (max 5 images)
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-red-500 transition-colors">
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
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-700 font-semibold mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>
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
                      ? `http://localhost:5000${img}`
                      : img
                    : URL.createObjectURL(img)
                }
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
              />

              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
              >
                <X size={16} />
              </button>

              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-bold">
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