
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/loading4.webm'
import { getData } from '../context/DataContext'
import BreadCrumbs from '../components/BreadCrumbs'
const SingleProduct = () => {

  const {singleProduct, getSingleProduct}=getData();

  const {id}= useParams()
//   console.log(id)

  

  useEffect(()=>{getSingleProduct(id)},[id])

  return (
    <>
    {
        singleProduct ? 
        <div className='px-4 pb-4 md:px-0'>
            <BreadCrumbs title={singleProduct.title}/>
            <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-2 gap-10'>
                {/* product image */}
                <div className="w-full">
                    <img src={singleProduct.images} alt={singleProduct.title} className='rounded-2xl w-full object-cover'/>
                </div>
                {/* product details */}
                <div className="flex flex-col gap-6">
                   <h1 className='md:text-3xl font-bold text-gray-800'>{singleProduct.title}</h1>
                   <div className="text-gray-700">{singleProduct.category.name.toUpperCase()} / {singleProduct.category.slug.toUpperCase()}</div>
                   <p className='text-xl text-red-500 font-bold'>${singleProduct.price}</p>
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
