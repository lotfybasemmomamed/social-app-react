import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const authConfig = () => {
  const token = cookie.get("Bearer");
  console.log("token",token)

 return {
    headers: {
      token: token, 
    },
  };
};

export const getComments =(id)=> axios.get(
  `https://linked-posts.routemisr.com/posts/${id}/comments`,
  authConfig()
);
