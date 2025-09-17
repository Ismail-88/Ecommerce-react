import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [singleProduct, setSingleProduct] = useState("");
  

  const api = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
  });

  // fetching all products from api
  const fetchAllProducts = async () => {
    try {
      const res = await api.get("/products");
      setData(res.data);  //if any doubt refer source.md file
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

 //fetchCategories
  const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data; // each item has {id, name, image}
  } catch (error) {
    console.log(error);
  }
};


  //fetching the singleProduct
  const getSingleProduct = async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      setSingleProduct(res.data);
    
    } catch (error) {
      console.log(error);
    }
  };

   // fetch products by category ID
   const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await api.get(`/categories/${categoryId}/products`);
      setData(res.data);
    } catch (error) {
      console.log("Error fetching category products:", error);
    }
  };

  //fetch categories names
  const categoryNames = [
    "All",
    ...new Set(data?.map((item) => item.category.name)),
  ];
  //  console.log(categoryNames);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryNames,
        singleProduct,
        fetchCategories,
        fetchProductsByCategory,
        getSingleProduct
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
