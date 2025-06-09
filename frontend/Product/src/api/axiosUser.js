import axios from "axios";

const instanceUser = axios.create({
    baseURL: "http://localhost:3000/user/api",
    withCredentials: true
})

export default instanceUser;