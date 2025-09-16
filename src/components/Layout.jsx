import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./footer/Footer"; 

const Layout = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
      <Footer />  
    </>
  );
};

export default Layout;
