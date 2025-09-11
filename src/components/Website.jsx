import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Website() {
  return (
    <div>
      <Navbar />
      <div className="mt-20 min-h-[100vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
