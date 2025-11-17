

const ColorSelector = ({ colors, selectedColor, onColorChange }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <h3 className="text-sm font-bold mb-4">
          Select Color: <span className="text-cyan-400">{selectedColor?.name}</span>
        </h3>
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => onColorChange(color)}
              className={`relative w-16 h-16 rounded-xl border-2 transition-all ${
                selectedColor?.name === color.name
                  ? 'border-cyan-500 scale-110 shadow-lg shadow-cyan-500/50'
                  : 'border-white/20 hover:border-white/40'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor?.name === color.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;