import React from "react";
import { useHomeData } from "./hooks/useHomeData";
import { getDealProducts } from "../../../utils/deals";
import CategoryRibbon from "./components/CategoryRibbon";
import BannerCarousel from "./components/BannerCarousel";
import ProductRail from "./components/ProductRail";
import TrustStrip from "./components/TrustStrip";
import HomeAnimations from "./components/HomeAnimations";

const Home = () => {
  const { data, featuredProducts } = useHomeData();
  const deals = getDealProducts(data).slice(0, 10);

  return (
    <div className="min-h-screen text-foreground">
      <CategoryRibbon />
      <BannerCarousel />
      <ProductRail
        eyebrow="Handpicked for you"
        title="Featured Picks"
        to="/products"
        products={featuredProducts}
      />
      {deals.length > 0 && (
        <ProductRail
          eyebrow="Limited time only"
          title="Deals of the Day"
          to="/deals"
          products={deals}
        />
      )}
      <TrustStrip />
      <HomeAnimations />
    </div>
  );
};

export default Home;
