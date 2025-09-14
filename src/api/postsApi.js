import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const authConfig = () => {
  const token = cookie.get("Bearer");
  console.log("token", token);

  return {
    headers: {
      token: token,
    },
  };
};

export const getAllPosts = () =>
  axios.get("https://linked-posts.routemisr.com/posts", authConfig());
export const getPostById = (id) =>
  axios.get(`https://linked-posts.routemisr.com/posts/${id}`, authConfig());
export const getUserPosts = (userId) =>
  axios.get(
    `https://linked-posts.routemisr.com/users/${userId}/posts`,
    authConfig()
  );
export const createPost = (data) =>
  axios.post("https://linked-posts.routemisr.com/posts", data, {
    ...authConfig(),
    headers: {
      ...authConfig().headers,
      "Content-Type": "multipart/form-data",
    },
  });
