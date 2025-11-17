import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

// Get API base either from Vite env (deployed) or local dev fallback
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

//
// Image utility functions (use API for relative paths)
const normalizeImagePath = (imagePath) => {
  if (!imagePath) return null;
  if (typeof imagePath !== "string") return null;
  if (imagePath.startsWith("http")) return imagePath;
  // ensure leading slash
  const pathWithSlash = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${API}${pathWithSlash}`;
};

const getProductImageUrl = (product) => {
  if (!product || !product.images) return null;
  const firstImage = Array.isArray(product.images) ? product.images[0] : product.images;
  return normalizeImagePath(firstImage);
};

const getProductImagesUrls = (product) => {
  if (!product || !product.images) return [null];
  const images = Array.isArray(product.images) ? product.images : [product.images];
  return images.map((img) => normalizeImagePath(img));
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useUser();

  const api = axios.create({
    baseURL: API.replace(/\/$/, ""), 
  });

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          await api.post("/api/user/auth/sync", {
            clerkId: user.id,
            email: user.emailAddresses?.[0]?.emailAddress,
            name: user.fullName,
            profileImage: user.profileImageUrl,
          });
        } catch (err) {
          console.error("Clerk user sync failed:", err);
        }
      })();
    }
  }, [user]); 

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
     
      const res = await api.get("/api/user/products");
      setData(res.data);
    } catch (error) {
      console.error("fetchAllProducts error:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/user/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("fetchCategories error:", error);
    }
  };

  // Fetch products by category slug/name
  const fetchProductsByCategoryName = async (categorySlugOrName) => {
    try {
     
      const res = await api.get(`/api/user/categories/${encodeURIComponent(categorySlugOrName)}`);
      setData(res.data);
    } catch (error) {
      console.error("fetchProductsByCategoryName error:", error);
      setData([]);
    }
  };

  // Fetch single product
  const getSingleProduct = async (id) => {
    try {
      const res = await api.get(`/api/user/products/${id}`);
      setSingleProduct(res.data);
      return res.data;
    } catch (error) {
      console.error("getSingleProduct error:", error);
      return null;
    }
  };

  const categoryNames = ["All", ...new Set(data?.map((item) => item.category?.name))];
  const brandNames = [...new Set(data?.map((item) => item.brand))];

  // Place order
  const placeOrder = async (orderData) => {
    try {
      const res = await api.post("/api/user/orders", orderData);
      const newOrder = res.data;
      setOrders((prev) => [newOrder, ...(prev || [])]);
      return newOrder;
    } catch (error) {
      console.error("placeOrder error:", error);
      throw error;
    }
  };

  // Fetch orders by user ID
  const fetchOrdersByUser = async (userId) => {
    setLoadingOrders(true);
    try {
      const res = await api.get(`/api/user/orders/user/${encodeURIComponent(userId)}`);
      setOrders(res.data);
    } catch (error) {
      console.error("fetchOrdersByUser error:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch single order by orderId
  const fetchOrderById = async (orderId) => {
    try {
      const res = await api.get(`/api/user/orders/${orderId}`);
      return res.data;
    } catch (error) {
      console.error("fetchOrderById error:", error);
      return null;
    }
  };

  // Fetch all orders (admin)
  const fetchAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await api.get("/api/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("fetchAllOrders error:", error);
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
        getImageUrl: normalizeImagePath,
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
