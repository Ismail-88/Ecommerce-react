import React from "react";
import { useHomeData } from "./hooks/useHomeData";
import HeroSection from "./components/HeroSection";
import FeaturesBar from "./components/FeaturesBar";
import CategoriesGrid from "./components/CategoriesGrid";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import DealsOfTheDaySection from "./components/DealsOfTheDaySection";
import CTASection from "./components/CTASection";
import HomeAnimations from "./components/HomeAnimations";

const Home = () => {
  const { data, featuredProducts, heroProduct } = useHomeData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection heroProduct={heroProduct} />
      <FeaturesBar />
      <CategoriesGrid />
      <FeaturedProductsSection products={featuredProducts} />
      <DealsOfTheDaySection products={data} />
      <CTASection />
      <HomeAnimations />
    </div>
  );
};

export default Home;
