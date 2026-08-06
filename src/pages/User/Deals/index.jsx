// pages/User/Deals/index.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { getData } from "../../../context/DataContext";
import { getDealProducts } from "../../../utils/deals";

import ProductCard from "../Products/components/ProductCard";
import PageHeader from "../../../components/ui/PageHeader";
import EmptyState from "../../../components/ui/EmptyState";
import Button from "../../../components/ui/Button";
import LiveCountdownTimer from "../SingleProducts/components/SingleProduct/LiveCountdownTimer";
import { SkeletonCard } from "../../../components/ui/Skeleton";

const Deals = () => {
  const navigate = useNavigate();
  const { data, fetchAllProducts } = getData();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAllProducts();
    }
  }, [fetchAllProducts]);

  const deals = getDealProducts(data);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-info">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest mb-4">
                <Zap size={14} aria-hidden />
                Flash Sale
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-3">Today's Deals</h1>
              <p className="text-white/85 text-lg max-w-xl">
                Big savings on premium products — while stock lasts!
              </p>
            </div>
            <div className="lg:w-[420px]">
              <LiveCountdownTimer />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {data.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : deals.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="No deals right now"
            description="Check back soon for exciting offers on premium products."
            action={
              <Button size="lg" onClick={() => navigate("/products")}>
                Browse Products
              </Button>
            }
          />
        ) : (
          <>
            <PageHeader
              icon={Zap}
              title="Deals of the Day"
              description={`${deals.length} products on sale — grab them before they're gone`}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {deals.map((product) => (
                <ProductCard key={product._id} product={product} viewMode="grid" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Deals;
