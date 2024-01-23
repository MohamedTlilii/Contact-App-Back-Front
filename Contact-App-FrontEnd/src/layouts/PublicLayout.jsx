import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
function PublicLayout() {
  return (
    <div className="max-w-screen-2xl m-auto">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
