import ProductCard from "./ProductCard";

const ProductsGrid = ({ products, viewMode }) => {
  if (!products || products.length === 0) {
    return null;
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${Math.min(index, 7) * 50}ms` }}
          >
            <ProductCard product={product} viewMode="list" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id="shop-grid" className="scroll-mt-24">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${Math.min(index, 7) * 50}ms` }}
          >
            <ProductCard product={product} viewMode="grid" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
