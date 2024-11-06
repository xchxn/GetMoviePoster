// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">Search</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/auth">Auth</Link>
      </nav>
    </div>
  );
};

export default Header;
