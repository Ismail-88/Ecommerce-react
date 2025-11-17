
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-white/5 to-transparent p-4">
                <img
                  src={Array.isArray(product.images) ? product.images[0] : product.images}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-2 mb-2 h-10">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-600 line-through">
                    ${Math.round(product.price * 1.2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;


