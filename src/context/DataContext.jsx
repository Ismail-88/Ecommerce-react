import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);   // all products or category products
  const [singleProduct, setSingleProduct] = useState(null);

  const api = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
  });

  // ✅ Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await api.get("/products");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      return res.data; // each item has {id, name, image}
    } catch (error) {
      console.log(error);
    }
  };
 
  // ✅ Fetch products by category name (e.g. "Electronics")
  const fetchProductsByCategoryName = async (name) => {
    try {
      // get all categories
      const categories = await fetchCategories();

      // find matching category
      const category = categories.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );

      if (!category) {
        console.error("Category not found");
        setData([]); 
        return;
      }

      // fetch products by numeric id
      const res = await api.get(`/categories/${category.id}/products`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch single product
  const getSingleProduct = async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryNames = [
    "All",
    ...new Set(data?.map((item) => item.category.name)),
  ];

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
