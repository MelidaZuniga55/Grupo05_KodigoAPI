import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";

const Layout = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
