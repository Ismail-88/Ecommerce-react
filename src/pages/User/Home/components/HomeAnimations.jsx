// components/home/HomeAnimations.jsx
import React from 'react';

const HomeAnimations = () => {
  return (
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-30px); }
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes scroll-smooth {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      @keyframes grid {
        0% { transform: translateY(0); }
        100% { transform: translateY(100px); }
      }
      @keyframes scroll {
        0% { transform: translateY(0); }
        100% { transform: translateY(8px); }
      }
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
      .animate-shimmer {
        animation: shimmer 3s linear infinite;
      }
      .animate-scroll-smooth {
        animation: scroll-smooth 30s linear infinite;
      }
      .animate-grid {
        animation: grid 20s linear infinite;
      }
      .animate-scroll {
        animation: scroll 1.5s ease-in-out infinite;
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
    `}</style>
  );
};

export default HomeAnimations;