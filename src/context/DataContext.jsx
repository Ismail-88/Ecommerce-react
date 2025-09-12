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

  //fetching the singleProduct
  const getSingleProduct = async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      setSingleProduct(res.data);
    
    } catch (error) {
      console.log(error);
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
        getSingleProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
