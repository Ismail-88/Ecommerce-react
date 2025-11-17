import React, { useEffect, useState } from 'react'
import { getData } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, TrendingUp, Zap, Shield, Truck, Clock, ChevronRight } from 'lucide-react'

const Home = () => {
  const { data, fetchAllProducts } = getData()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (data && data.length > 0) {
      setFeaturedProducts(data.slice(0, 8))
    }
  }, [data])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const categories = [
    { name: 'Electronics', icon: '💻', gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
    { name: 'Fashion', icon: '👔', gradient: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30' },
    { name: 'Home & Living', icon: '🏠', gradient: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500/30' },
    { name: 'Sports', icon: '⚽', gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Dark Premium */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-white/90">Shop smarter, save bigger</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Discover Products
            <br />
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              With the Best Pricing
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Select from 10,000+ items ensuring a perfect fit. Need more or less? Customize subscriptions for a flawless fit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/products">
              <button className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Browse
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl font-semibold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Basic', price: 'Free', features: 'For individual use', popular: false },
              { name: 'Enterprise', price: '$20', features: 'For small organizations', popular: true },
              { name: 'Business', price: '$120', features: 'Most for large businesses', popular: false },
            ].map((plan, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl border p-8 transition-all hover:scale-105 ${
                  plan.popular
                    ? 'border-white/40 bg-white/10 backdrop-blur-2xl'
                    : 'border-white/20 bg-white/5 backdrop-blur-2xl hover:border-white/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-fuchsia-500 px-4 py-1 text-xs font-bold text-white">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 rounded-full border-2 border-white/60"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.features}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== 'Free' && <span className="text-gray-400 ml-2">/ per month</span>}
                </div>
                <button className="w-full py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/20 transition-all">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-400 text-lg">Explore our curated collections</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl border ${category.border} bg-gradient-to-br ${category.gradient} backdrop-blur-xl p-8 cursor-pointer transition-all hover:scale-105`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.name}</h3>
                <ChevronRight className="absolute bottom-6 right-6 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="relative py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-400">Handpicked for you</p>
            </div>
            <Link to="/products">
              <button className="hidden md:flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl px-6 py-3 font-semibold hover:bg-white/10 transition-all">
                View All
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group relative rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl overflow-hidden transition-all hover:border-white/40 hover:scale-105"
              >
                <div className="relative h-64 bg-gradient-to-br from-white/10 to-transparent p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">4.5</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Within 24 hours' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: Clock, title: '24/7 Support', desc: 'Always here for you' },
              { icon: Zap, title: 'Best Quality', desc: 'Premium products' },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl p-6 transition-all hover:border-white/40 hover:bg-white/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-fuchsia-500/20 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of satisfied customers and experience premium shopping
          </p>
          <Link to="/products">
            <button className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
              <span className="relative z-10 flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

export default Home