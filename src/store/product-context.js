import React, { useState } from "react";
import { getAuth, deleteAuth, putAuth, postAuth } from "../services";

export const ProductContext = React.createContext();

export function ProductContextProvider({ children }) {
  const [listProduct, setListProduct] = useState();
  const [selectedItem, setSlectedItem] = useState();

  const getListProduct = async (payload) => {
    try {
      const response = await getAuth(
        "http://localhost:8000/api/book",
        payload
      );
      setListProduct(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await getAuth(`http://localhost:8000/api/book/${id}`);
      setSlectedItem(response);
    } catch (e) {
      console.log(e);
    }
  };

  const createProduct = async (payload) => {
    try {
      await postAuth("http://localhost:8000/api/book", payload);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (payload, id) => {
    try {
      await putAuth(`http://localhost:8000/api/book/${id}`, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductById = async (id) => {
    try {
      await deleteAuth(`http://localhost:8000/api/book/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    getListProduct,
    listProduct,
    getProductById,
    selectedItem,
    deleteProductById,
    createProduct,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
