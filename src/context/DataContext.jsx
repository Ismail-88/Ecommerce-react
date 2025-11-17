// DataContext.jsx
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

// Vite env (set VITE_API_URL in .env) or fallback to your production Render URL
const API_BASE = import.meta.env.VITE_API_URL || "https://node-api-backend-9fpb.onrender.com";

// helper to join base + path safely
const joinBase = (base, path) => {
  const b = base.replace(/\/$/, "");
  if (!path) return b;
  return path.startsWith("/") ? b + path : b + "/" + path;
};

// Image utility functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return joinBase(API_BASE, imagePath);
};

const getProductImageUrl = (product) => {
  if (!product || !product.images) return null;
  const firstImage = Array.isArray(product.images) ? product.images[0] : product.images;
  return getImageUrl(firstImage);
};

const getProductImagesUrls = (product) => {
  if (!product || !product.images) return [null];
  const images = Array.isArray(product.images) ? product.images : [product.images];
  return images.map((img) => getImageUrl(img));
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]); 
  const [singleProduct, setSingleProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useUser();

  const api = axios.create({
    baseURL: joinBase(API_BASE, "/"),
  });

  useEffect(() => {
    if (user) {
      // Update to match your backend route
      api.post("/api/user/auth/sync", {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
        profileImage: user.profileImageUrl,
      }).catch(err => {
        console.error("Clerk user sync failed:", err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAllProducts = async () => {
    try {
      // Changed from /products to /api/user/products
      const res = await api.get("/api/user/products");
      setData(res.data);
    } catch (error) {
      console.error("fetchAllProducts error:", error.response?.data || error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      // Changed from /categories to /api/user/categories
      const res = await api.get("/api/user/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductsByCategoryName = async (categorySlugOrName) => {
    try {
      // Changed from /categories/:name to /api/user/categories/:name
      const res = await api.get(`/api/user/categories/${categorySlugOrName}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  };

  const getSingleProduct = async (id) => {
    try {
      // Changed from /products/:id to /api/user/products/:id
      const res = await api.get(`/api/user/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const categoryNames = ["All", ...new Set(data?.map((item) => item.category?.name))];
  const brandNames = [...new Set(data?.map((item) => item.brand))];

  const placeOrder = async (orderData) => {
    try {
      // Changed from /orders to /api/user/orders
      const res = await api.post("/api/user/orders", orderData);
      const newOrder = res.data;
      setOrders((prev) => [newOrder, ...(prev || [])]);
      return newOrder;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const fetchOrdersByUser = async (userId) => {
    setLoadingOrders(true);
    try {
      // Changed from /orders/user/:id to /api/user/orders/user/:id
      const res = await api.get(`/api/user/orders/user/${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchOrderById = async (orderId) => {
    try {
      // Changed from /order/:id to /api/user/orders/:id
      const res = await api.get(`/api/user/orders/${orderId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllOrders = async () => {
    setLoadingOrders(true);
    try {
      // Changed from /orders to /api/user/orders
      const res = await api.get("/api/user/orders");
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
        loadingOrders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);