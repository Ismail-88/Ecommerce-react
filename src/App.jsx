
import React, { useEffect, useState } from 'react'
import './index.css'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
const {cartItem, setCartItem} = useCart()
  const [location, setLocation]= useState();
  const [openDropDown,setOpenDropDown] = useState(false);
  const getLocation = async ()=>{

    
    navigator.geolocation.getCurrentPosition(async pos =>{
      const {latitude,longitude} = pos.coords
      // console.log(latitude,longitude)

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        // console.log(location)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropDown(false)
      } catch (error) {
        console.log(error)
      }
    })
  }
useEffect(()=>{getLocation()},[])
// load cart from local storage
useEffect(()=>{const storedCart = localStorage.getItem('cartItem')
  if(storedCart){
    setCartItem(JSON.parse(storedCart))
  }
},[])
// save cart to local storage whenever it changes
useEffect(()=>{localStorage.setItem('cartItem',JSON.stringify(cartItem))},[cartItem])
  return (
    
    <BrowserRouter>
    <Navbar location = {location} getLocation = {getLocation} openDropDown={openDropDown} setOpenDropDown= {setOpenDropDown}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/products/:id' element={<SingleProduct/>}></Route>
        <Route path='/category/:id' element={<CategoryProduct/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/cart' element={<ProtectedRoute><Cart location={location} getLocation={getLocation}/></ProtectedRoute>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
   
  )
}

export default App
