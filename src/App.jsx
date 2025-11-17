
import React, { useEffect, useState } from 'react'
import './index.css'
import Home from './pages/User/Home'
import About from './pages/User/About'
import Contact from './pages/User/Contact'
import Cart from './pages/User/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
// import SingleProduct from './pages/User/SingleProduct'
import CategoryProduct from './pages/User/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import OrderConfirmation from './pages/User/OrderConfirm'


// Admin Imports
import AdminDashboard from './pages/Admin/AdminDashboard'
import AddEditProduct from './pages/Admin/AddEditProducts'
import AdminLogin from './Auth/AdminLogin'
import AdminRoute from './components/Admin/AdminRoute'
import ClerkUserSync from './components/ClerkUserSync'
import { SignedIn } from '@clerk/clerk-react'
import Settings from './pages/Admin/AdminSettings'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminCustomers from './pages/Admin/AdminCustomers'
import AdminOrders from './pages/Admin/AdminOrders'
import Analytics from './pages/Admin/AdminAnalytics'
import Inventory from './pages/Admin/AdminInventory'
import AdminCategories from './pages/Admin/AdminCategory'
import AdminLayout from './layouts/AdminLayouts'
import SingleProduct from './pages/User/SingleProducts'
import Products from './pages/User/Products'
import Checkout from './pages/User/Checkout'
import MyOrders from './pages/User/Orders'
import OrderTracking from './pages/User/OrderTracking'
import CustomScrollToTop from "./components/CustomScrollToTop"

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

useEffect(()=>{const storedCart = localStorage.getItem('cartItem')
  if(storedCart){
    setCartItem(JSON.parse(storedCart))
  }
},[])
useEffect(()=>{localStorage.setItem('cartItem',JSON.stringify(cartItem))},[cartItem])
  return (
   <>
    <BrowserRouter>
        <SignedIn>
           <ClerkUserSync />
        </SignedIn>
      <Routes>
        {/* ========== USER ROUTES (with Navbar & Footer) ========== */}
        <Route path="/*" element={
          <>
            <Navbar 
              location={location} 
              getLocation={getLocation} 
              openDropDown={openDropDown} 
              setOpenDropDown={setOpenDropDown}
            />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<SingleProduct />} />
              <Route path='/product/:id' element={<SingleProduct />} />
              <Route path='/category/:id' element={<CategoryProduct />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={
                <ProtectedRoute>
                  <Cart location={location} getLocation={getLocation} />
                </ProtectedRoute>
              } />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/order-confirmation' element={<OrderConfirmation />} />
              <Route path="/track-order" element={<OrderTracking />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
            <Footer />
          </>
        } />

        {/* ========== ADMIN LOGIN ROUTE (No Layout, No Protection) ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ========== ADMIN ROUTES (Protected with AdminRoute) ========== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
                <CustomScrollToTop />
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="category" element={<AdminCategories />} />
          <Route path="products/add" element={<AddEditProduct />} />
          <Route path="products/edit/:id" element={<AddEditProduct />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>

</>
  )
}

export default App

