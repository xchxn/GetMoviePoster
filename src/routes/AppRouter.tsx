// src/routes/AppRouter.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { isAuthenticated } from '../utils/auth';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import Wishlist from '../components/Wishlist/Wishlist';
import Trending from '../components/Trending/Trending';
import Search from '../components/Search/Search';
import { kakaoLoginCallback } from '../utils/social-auth';
import KakaoCallback from '../components/Login/KaKaoCallback';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};

const AppRouter: React.FC = () => (
  <Router>
    <Header />
    <AnimatePresence>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<ProtectedRoute><Search/></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
        <Route path="/trending" element={<ProtectedRoute><Trending/></ProtectedRoute>} />
        <Route path="/oauth/callback/kakao" element={<KakaoCallback />} />
      </Routes>
    </AnimatePresence>
  </Router>
);

export default AppRouter;
