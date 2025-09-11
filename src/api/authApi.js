import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com";
export const register = (userData) =>
  axios.post(`${baseUrl}/users/signup`, userData);
export const login = (userData) =>
  axios.post(`${baseUrl}/users/signin`, userData);
