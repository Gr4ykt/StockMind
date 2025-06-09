import axios from "axios";

const instanceProduct = axios.create({
    baseURL: "http://localhost:3000/product/api",
    withCredentials: true
})

export default instanceProduct;