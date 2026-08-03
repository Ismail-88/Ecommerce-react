import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getData } from '../context/DataContext'

import Button from './ui/Button'

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const { getProductImageUrl } = getData();
  const imageUrl = getProductImageUrl(product);

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card overflow-hidden mb-4">
      <div className="flex flex-col sm:flex-row gap-5 p-4">
        <img
          src={imageUrl}
          alt={product.title}
          className="md:h-52 md:w-52 h-40 w-full object-cover rounded-xl cursor-pointer bg-surface-alt flex-shrink-0"
          onClick={() => navigate(`/products/${product._id}`)}
        />
        <div className="space-y-2 flex-1 min-w-0">
          <h1
            className="font-bold text-lg md:text-xl line-clamp-2 text-foreground hover:text-brand-600 cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            {product.title}
          </h1>
          <p className="font-semibold flex items-center text-foreground">
            $<span className="text-3xl font-extrabold">{product.price}</span>
            <span className="ml-2 text-sm text-success">(5% off)</span>
          </p>
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            <Truck size={14} aria-hidden />
            FREE delivery <span className="font-semibold text-foreground">Fri, 18 Apr</span>
            <br />
            Or fastest delivery <span className="font-semibold text-foreground">Tomorrow, 17 Apr</span>
          </p>
          <Button onClick={() => addToCart(product)}>
            <ShoppingCart size={16} aria-hidden />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView
