import ProductCard from "./ProductCard";


const ProductsGrid = ({ products, viewMode }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={viewMode === "grid" 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      : "flex flex-col gap-6"
    }>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;