// components/orders/EmptyOrdersState.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox } from 'react-icons/fa';
import { ShoppingBag, Sparkles } from 'lucide-react';

const EmptyOrdersState = ({ filter }) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
          <div className="relative w-32 h-32 rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center">
            <FaBox className="text-6xl text-gray-600" />
          </div>
        </div>

        <h2 className="text-4xl font-black mb-4">
          {filter === "all" ? "No Orders Yet" : `No ${filter} Orders`}
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md">
          {filter === "all"
            ? "Start your luxury shopping journey today"
            : `You don't have any ${filter} orders at the moment`}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold">
            <Sparkles className="w-5 h-5" />
            Start Shopping
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default EmptyOrdersState;