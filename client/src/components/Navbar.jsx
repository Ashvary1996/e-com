import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-teal-200 flex p-2">
      <div className="flex m-auto space-x-3">
        <Link to="/home">Home</Link>
        <Link to="/home">Contact</Link>
      </div>
      <div className="space-x-3">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Log-Out</Link>
      </div>
        <Outlet/>
    </div>
  );
}

export default Navbar;
