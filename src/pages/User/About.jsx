// pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Crown, Sparkles, Target, Eye, Award, Users, Zap, Shield, ArrowRight } from "lucide-react";

const About = () => {
  const features = [
    { icon: Award, title: "Premium Quality", desc: "Top-quality products from trusted brands" },
    { icon: Zap, title: "Lightning Fast", desc: "Quick and secure shipping" },
    { icon: Shield, title: "Reliable Support", desc: "24/7 customer assistance" },
    { icon: Users, title: "Easy Returns", desc: "Hassle-free shopping experience" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ABOUT US
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="block mb-2">Welcome to</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50"></span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ShopSphere
              </span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your one-stop destination for the latest and greatest in electronics. From cutting-edge gadgets to must-have accessories, we're here to power up your tech life.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        {/* Mission Section */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-12 mb-12">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Our Mission
              </h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              At ShopSphere, our mission is to make innovative technology accessible to everyone. We're passionate about connecting people with the tools and tech they need to thrive in a digital world — all at competitive prices and delivered with speed and care.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ShopSphere?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 hover:border-cyan-500/30 transition-all"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-12 mb-12">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Our Vision
              </h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              We envision a future where technology elevates everyday life. At ShopSphere, we're committed to staying ahead of the curve, offering cutting-edge solutions that are both practical and affordable.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative p-12 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Join the{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ShopSphere Family
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a tech enthusiast, a professional, or just looking for something cool and functional — ShopSphere has something for everyone.
            </p>
            <Link to="/products">
              <button className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-3 px-10 py-5 text-white font-bold text-lg">
                  <Sparkles className="w-5 h-5" />
                  Start Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;