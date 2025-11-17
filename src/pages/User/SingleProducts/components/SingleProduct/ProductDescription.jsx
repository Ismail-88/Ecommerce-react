
import React, { useMemo } from 'react';

const ProductDescription = ({ description, brand, category }) => {
  const specifications = useMemo(() => [
    { label: 'Brand', value: brand },
    { label: 'Category', value: category?.name || category },
    { label: 'Availability', value: 'In Stock' }
  ], [brand, category]);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <h3 className="text-lg font-bold mb-4">Product Description</h3>
        <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
        
        <h3 className="text-lg font-bold mb-4">Specifications</h3>
        <div className="space-y-3">
          {specifications.map((spec, i) => (
            <div key={i} className="flex border-b border-white/10 pb-3">
              <span className="text-gray-500 w-1/3">{spec.label}</span>
              <span className="font-semibold w-2/3">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;