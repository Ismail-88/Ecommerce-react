import React, { useEffect, useState } from 'react'
import { getData } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Zap, Shield, Truck, Award, Sparkles, Crown, TrendingUp, ChevronRight, Eye } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const Home = () => {
  const { data, fetchAllProducts } = getData()
  const { addToCart, cartItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (data && data.length > 0) {
      setFeaturedProducts(data.slice(0, 8))
      setTrendingProducts(data.slice(10, 14))
    }
  }, [data])

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const heroSlides = [
    { title: "Premium Collection", subtitle: "Luxury Redefined", color: "from-cyan-500 to-blue-600" },
    { title: "Exclusive Designs", subtitle: "Curated For You", color: "from-blue-500 to-purple-600" },
    { title: "Elite Experience", subtitle: "Shop With Style", color: "from-purple-500 to-pink-600" }
  ]

  const categories = [
    { name: 'Premium Tech', icon: '💎', gradient: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20', border: 'border-cyan-500/30' },
    { name: 'Luxury Fashion', icon: '👑', gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20', border: 'border-purple-500/30' },
    { name: 'Elite Living', icon: '✨', gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20', border: 'border-blue-500/30' },
    { name: 'Pro Sports', icon: '⚡', gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20', border: 'border-emerald-500/30' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with 3D Depth */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15),transparent_50%)]"></div>
          <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        </div>

        {/* Floating Grid Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] animate-grid"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-2xl px-5 py-3 mb-8 group hover:border-cyan-500/30 transition-all">
                <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EXCLUSIVE COLLECTION 2025
                </span>
              </div>

              {/* Animated Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05]">
                <span className="block mb-2">Experience</span>
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50 animate-pulse-slow"></span>
                  <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Luxury
                  </span>
                </span>
                <span className="block">Shopping</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover premium products curated exclusively for the discerning shopper. Elevate your lifestyle today.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link to="/products">
                  <button className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold">
                      Explore Collection
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <button className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl px-8 py-4 font-bold hover:border-cyan-500/30 transition-all">
                  <span className="relative flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    Watch Video
                  </span>
                </button>
              </div>

              {/* Stats with Glassmorphism */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                {[
                  { value: '15K+', label: 'Products', icon: Sparkles },
                  { value: '100K+', label: 'Happy Customers', icon: Award },
                  { value: '5.0', label: 'Rating', icon: Star }
                ].map((stat, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 text-center group-hover:border-cyan-500/30 transition-all">
                      <stat.icon className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Product Showcase */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full blur-[100px] animate-pulse-slow"></div>
                {data && data[20] && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                    <img 
                      src={data[20].images} 
                      alt="Featured Product"
                      className="relative w-full h-[550px] object-contain drop-shadow-2xl animate-float transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Scrolling Features Bar */}
      <div className="relative border-y border-white/5 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-xl py-6 overflow-hidden">
        <div className="flex items-center gap-16 animate-scroll-smooth whitespace-nowrap">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-16">
              {[
                { icon: Truck, text: 'Free Express Delivery', gradient: 'from-cyan-400 to-blue-500' },
                { icon: Shield, text: '100% Secure Payments', gradient: 'from-blue-400 to-purple-500' },
                { icon: Award, text: 'Premium Quality Guaranteed', gradient: 'from-purple-400 to-pink-500' },
                { icon: Zap, text: '24/7 Priority Support', gradient: 'from-pink-400 to-rose-500' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{feature.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Categories - Luxury Grid */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-gray-300">PREMIUM COLLECTIONS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Shop by
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"> Category</span>
            </h2>
            <p className="text-gray-400 text-lg">Curated selections for the elite</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/products">
                <div className={`group relative rounded-3xl border ${category.border} bg-gradient-to-br ${category.gradient} backdrop-blur-xl overflow-hidden aspect-square cursor-pointer transition-all hover:scale-[1.02]`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative h-full flex flex-col justify-between p-8">
                    <div className="text-6xl group-hover:scale-110 transition-transform">{category.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                        Explore Collection
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products - Premium Grid */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-4 py-2 mb-4">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold text-gray-300">HANDPICKED</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">Featured Products</h2>
              <p className="text-gray-400">Excellence in every detail</p>
            </div>
            <Link to="/products">
              <button className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-3 font-bold hover:border-cyan-500/30 transition-all">
                View All
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl overflow-hidden hover:border-cyan-500/30 hover:scale-[1.02] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                <div className="relative h-64 bg-gradient-to-br from-white/5 to-transparent p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-3 py-1.5 text-xs font-bold shadow-lg">
                    NEW
                  </div>
                </div>
                <div className="relative p-6">
                  <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-400">4.9</span>
                    </div>
                  </div>
                  <button className="relative w-full overflow-hidden group/btn rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <Link >
                    <span className="relative block py-3 text-sm font-bold text-white">
                      Add to Collection
                    </span>
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 text-cyan-400 animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Experience
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Luxury Shopping?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover premium products curated just for you
          </p>
          <Link to="/products">
            <button className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-3 px-10 py-5 text-white font-bold text-lg">
                Start Shopping Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </div>
      </div>

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
      `}</style>
    </div>
  )
}

export default Home