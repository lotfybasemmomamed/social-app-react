import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AddNewPost from "../components/posts/AddNewPost";

export default function Website() {
  return (
    <div>
      <Navbar />
      <div className="mt-20 min-h-[100vh]">
        <Outlet />
      </div>
  <AddNewPost/>
      <Footer />
    </div>
  );
}
