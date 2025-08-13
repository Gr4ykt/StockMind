import axios from "axios";

const instanceProduct = axios.create({
    baseURL: "http://localhost:5001/api/v1/prediction",
    withCredentials: false
});

export const ChatIARequest = (question) => {
    return instanceProduct.post('/e5ac2486-1ce5-4aaf-b9a2-9718cf64c13d', {
        question: question
    });
};