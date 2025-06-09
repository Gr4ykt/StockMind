import axios from "./axiosProduct.js";

export const productsRequest = () => axios.get('/get-products');

export const getProductRequest = (id) => axios.get(`/product/${id}`);
export const createProductRequest = (product) => axios.post('/product', product);
export const updateProductRequest = (id, product) => axios.put(`/product/${id}`, product);
export const deleteProductRequest = (id) => axios.delete(`/product/${id}`);