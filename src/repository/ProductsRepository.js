import axios from "axios";
import { createContext, useState } from "react";

export const api = axios.create({ baseURL: "http://localhost:9000" });

export const getProducts = (keyword, page, size) => {
  return api.get(`/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
};
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};
export const saveProduct = (product) => {
  return api.post("/products", product);
};
export const updateProduct = (product) => {
  return api.put(`/products/${product.id}`, product);
};
export const checkProduct = (product) => {
  return api.patch(`/products/${product.id}`, { checked: !product.checked });
};
export const deleteProduct = (product) => {
  return api.delete(`/products/${product.id}`);
};

export const useAppState = () => {
  const initialStat = {
    keyword: "",
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    products: [],
  };
  const appState = useState(initialStat);
  return appState;
};
