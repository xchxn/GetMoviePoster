// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthPage from '../pages/Auth/AuthPage';
import HomePage from '../pages/Home/HomePage';
import TrendingPage from '../pages/Trending/TrendingPage';
import SearchPage from '../pages/Search/SearchPage';
import WishlistPage from '../pages/Wishlist/WishlistPage';

const AppRouter: React.FC = () => (
  <Router>
    <AnimatePresence>
      <Routes>
        <Route
          path="/auth"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AuthPage />
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/trending"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TrendingPage />
            </motion.div>
          }
        />
        <Route
          path="/search"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SearchPage />
            </motion.div>
          }
        />
        <Route
          path="/wishlist"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WishlistPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  </Router>
);

export default AppRouter;
