import axios from "./axiosUser.js"

export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get('/verify');
export const logoutRequest = user => axios.post('/logout', user);