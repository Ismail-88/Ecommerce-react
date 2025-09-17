
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/loading4.webm'
import { getData } from '../context/DataContext'
import BreadCrumbs from '../components/BreadCrumbs'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'
const SingleProduct = () => {

  const {singleProduct, getSingleProduct}=getData();

  const {id}= useParams()
//   console.log(id)
  const {addToCart} = useCart();
  

  useEffect(()=>{getSingleProduct(id)},[id])
const discountPercentage = 10; // you can set this dynamically
const OriginalPrice = Math.round(
  singleProduct?.price + (singleProduct?.price * discountPercentage / 100)
);  return (
    <>
    {
        singleProduct ? 
        <div className='px-4 pb-4 md:px-0'>
            <BreadCrumbs title={singleProduct.title}/>
            <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* product image */}
                <div className="w-full">
                    <img src={singleProduct.images} alt={singleProduct.title} className='rounded-2xl w-full object-cover'/>
                </div>
                {/* product details */}
                <div className="flex flex-col gap-6">
                   <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{singleProduct.title}</h1>
                   <div className="text-gray-700">{singleProduct.category.name.toUpperCase()} / {singleProduct.category.slug.toUpperCase()}</div>
                   <p className='text-xl text-red-500 font-bold'>${singleProduct?.price} <span className='text-gray-700 line-through'>${OriginalPrice}</span> <span className='bg-red-500 text-white rounded-full px-4 py-2'>4% discount</span></p>
                    <p className='text-gray-600 mt-3'>{singleProduct.description}</p>

                    {/* Quantity selector */}
                <div className="flex items-center gap-4">
                   <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                   <input type="number" min={1} value={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500' />
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={()=>addToCart(singleProduct)} className='cursor-pointer px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
                </div>
                </div>
            </div>
        </div> :  
        <div className="flex items-center justify-center h-screen">
            <video muted autoPlay loop>
                <source src={Loading} type="video/webm" />
            </video>
        </div>
    }
    </>
  )
}

export default SingleProduct
