// // src/components/Navbar.tsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { logout } from "../../utils/auth";

// const Header: React.FC = () => {
//   return (
//     <div>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/search">Search</Link>
//         <Link to="/trending">Trending</Link>
//         <Link to="/wishlist">Wishlist</Link>
//         <Link to="/auth">Auth</Link>
//         <button onClick={logout}>
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Header;
// src/components/Navbar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../utils/auth";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <nav className={styles.navLinks}>
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
        <Link
          to="/auth"
          className={`${styles.navLink} ${
            location.pathname === "/auth" ? styles.activeLink : ""
          }`}
        >
          Auth
        </Link>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Header;
