// components/RecentlyViewedSection.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import ProductCard from "../pages/User/Products/components/ProductCard";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

const RecentlyViewedSection = ({ currentProductId, limit = 6 }) => {
  const navigate = useNavigate();

  const recent = useMemo(() => {
    const all = getRecentlyViewed();
    const filtered = currentProductId
      ? all.filter((p) => p._id !== currentProductId)
      : all;
    return filtered.slice(0, limit);
  }, [currentProductId, limit]);

  if (recent.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <SectionHeading
          align="left"
          title="Recently Viewed"
          description="Pick up where you left off"
          className="mb-0"
        />
        <Button variant="outline" size="sm" onClick={() => navigate("/products")}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
        {recent.map((product) => (
          <ProductCard key={product._id} product={product} viewMode="grid" />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
