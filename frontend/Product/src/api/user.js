import axios from "./axiosUser.js"

export const profileRequest = () => axios.get('/profile');
export const usersRequest = () => axios.get('/get-users');

export const getUserRequest = (id) => axios.get(`/user/${id}`);
export const createUserRequest = (user) => axios.post('/user', user);
export const updateUserRequest = (id, user) => axios.put(`/user/${id}`, user);
export const deleteUserRequest = (id) => axios.delete(`/user/${id}`);