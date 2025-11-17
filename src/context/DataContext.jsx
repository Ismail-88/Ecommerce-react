import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

// Image utility functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `http://localhost:5000${imagePath}`;
};

const getProductImageUrl = (product) => {
  if (!product || !product.images) {
    return null;
  }
  const firstImage = Array.isArray(product.images) 
    ? product.images[0] 
    : product.images;
  return getImageUrl(firstImage);
};

const getProductImagesUrls = (product) => {
  if (!product || !product.images) {
    return [null];
  }
  const images = Array.isArray(product.images) 
    ? product.images 
    : [product.images];
  return images.map(img => getImageUrl(img));
};


export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);   
  const [singleProduct, setSingleProduct] = useState(null);
 const [orders, setOrders] = useState([]);
 const [loadingOrders, setLoadingOrders] = useState(false);
 const [categories, setCategories] = useState([])

 const { user } = useUser();
  const api = axios.create({
    // baseURL: "https://api.escuelajs.co/api/v1",
    baseURL: "http://localhost:5000/",
  });

   
  useEffect(() => {
    if (user) {
      axios.post("http://localhost:5000/api/users/sync", {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
        profileImage: user.profileImageUrl,
      }).catch(err => {
        // Optional: handle errors
        console.error("Clerk user sync failed:", err);
      });
    }
  }, [user]);
  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await api.get("/products");
      setData(res.data);
      // console.log("API Response:", res.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories( res.data);
    } catch (error) {
      console.log(error);
    }
  };
 
 // Fetch products directly by category slug or name
const fetchProductsByCategoryName = async (categorySlugOrName) => {
  try {
    const res = await api.get(`/categories/${categorySlugOrName}`);
    setData(res.data);  
  } catch (error) {
    console.error("Error fetching products:", error);
    setData([]);
  }
};

  // Fetch single product
  const getSingleProduct = async (id) => {  
    try {
      const res = await api.get(`/products/${id}`);
      setSingleProduct(res.data);
      console.log(singleProduct)
    } catch (error) {
      console.log(error);
    }
  };

  const categoryNames = [
    "All",
    ...new Set(data?.map((item) => item.category?.name)),
  ];

  const brandNames = [...new Set(data?.map((item)=>item.brand))]

  
  //  Place order
  const placeOrder = async (orderData) => {
  try {
    const res = await api.post("/orders", orderData);
    const newOrder = res.data;
    // Update context state so consumers see it immediately
    setOrders(prev => [newOrder, ...(prev || [])]);
    return newOrder;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

  // Fetch orders by user ID
  const fetchOrdersByUser = async (userId) => {
    setLoadingOrders(true);
    try {
      const res = await api.get(`/orders/user/${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch single order by orderId

  const fetchOrderById = async(orderId)=>{
    try {
      const res = await api.get(`/order/${orderId}`);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch all orders (for admin)
const fetchAllOrders = async () => {
  setLoadingOrders(true);
  try {
    const res = await api.get("/orders"); 
    setOrders(res.data);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    setOrders([]);
  } finally {
    setLoadingOrders(false);
  }
};

 

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        fetchProductsByCategoryName,
        fetchCategories,
        categoryNames,
        singleProduct,
        getSingleProduct,
        brandNames,
         products: data, 
         orders,
         fetchOrdersByUser,
         placeOrder,
         fetchOrderById,
         categories,
         fetchAllOrders,
          getImageUrl,
        getProductImageUrl,
        getProductImagesUrls,
        loadingOrders
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
