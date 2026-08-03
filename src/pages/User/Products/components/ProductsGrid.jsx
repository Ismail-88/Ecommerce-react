import ProductCard from "./ProductCard";

const ProductsGrid = ({ products, viewMode }) => {
  if (!products || products.length === 0) {
    return null;
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} viewMode="list" />
        ))}
      </div>
    );
  }

  const [featured, ...rest] = products;

  return (
    <div id="shop-grid" className="scroll-mt-28">
      {/* Featured spotlight card */}
      {featured && (
        <div className="mb-5">
          <ProductCard product={featured} viewMode="grid" featured />
        </div>
      )}

      {/* Standard grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {rest.map((product, index) => (
            <div
              key={product._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index, 7) * 60}ms` }}
            >
              <ProductCard product={product} viewMode="grid" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
