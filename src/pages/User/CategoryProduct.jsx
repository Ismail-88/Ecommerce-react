import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../context/DataContext";
import { ChevronLeft, Package } from "lucide-react";
import ProductListView from "../../components/ProductListView";
import PageHeader from "../../components/ui/PageHeader";
import { FullPageSpinner } from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

const CategoryProduct = () => {
  const { id } = useParams(); // id = "Electronics", "Clothes" etc
  const { data, fetchProductsByCategoryName } = getData();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) fetchProductsByCategoryName(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 mb-5 text-sm font-semibold text-text-muted hover:text-brand-600 transition-colors"
          >
            <ChevronLeft size={18} aria-hidden />
            Back
          </button>
          <PageHeader
            icon={Package}
            title={id}
            description={`Browse all products in the ${id} category`}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {data.length > 0 ? (
          <div>
            {data.map((product, index) => {
              return <ProductListView key={index} product={product} />;
            })}
          </div>
        ) : (
          <FullPageSpinner label="Loading category products..." />
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
