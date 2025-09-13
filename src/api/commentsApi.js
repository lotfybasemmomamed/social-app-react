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

export const getComments = (id) =>
  axios.get(
    `https://linked-posts.routemisr.com/posts/${id}/comments`,
    authConfig()
  );
export const createComment = (data) =>
  axios.post(`https://linked-posts.routemisr.com/comments`, data, authConfig());

export const deleteComment = (id) =>
  axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, authConfig());

export const updateComment = (id,data) =>
  axios.put(`https://linked-posts.routemisr.com/comments/${id}`,data, authConfig());
