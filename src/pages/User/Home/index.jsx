// pages/Home.jsx
import React from 'react';
import { useHomeData } from './hooks/useHomeData';
import HeroSection from './components/HeroSection';
import FeaturesBar from './components/FeaturesBar';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProductsSection from './components/FeaturedProductsSection';
import CTASection from './components/CTASection';
import HomeAnimations from './components/HomeAnimations';


const Home = () => {
  const {
    featuredProducts,
    heroProduct
  } = useHomeData();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection heroProduct={heroProduct} />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Categories Grid */}
      <CategoriesGrid />

      {/* Featured Products */}
      <FeaturedProductsSection products={featuredProducts} />

      {/* CTA Section */}
      <CTASection />

      {/* Animations */}
      <HomeAnimations />
    </div>
  );
};

export default Home;