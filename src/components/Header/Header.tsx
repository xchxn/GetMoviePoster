import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../../utils/auth";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 모바일 메뉴가 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.navbar}>
      <button 
        className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link
          to="/"
          className={`${styles.navLink} ${
            location.pathname === "/" ? styles.activeLink : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/search"
          className={`${styles.navLink} ${
            location.pathname === "/search" ? styles.activeLink : ""
          }`}
        >
          Search
        </Link>
        <Link
          to="/trending"
          className={`${styles.navLink} ${
            location.pathname === "/trending" ? styles.activeLink : ""
          }`}
        >
          Trending
        </Link>
        <Link
          to="/wishlist"
          className={`${styles.navLink} ${
            location.pathname === "/wishlist" ? styles.activeLink : ""
          }`}
        >
          Wishlist
        </Link>
        {!!isAuthenticated() ? (
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <Link
            to="/signin"
            className={`${styles.navLink} ${
              location.pathname === "/signin" ? styles.activeLink : ""
            }`}
          ></Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
