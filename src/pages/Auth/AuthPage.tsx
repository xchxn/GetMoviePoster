// src/pages/Auth/AuthPage.tsx
import React, { useState } from 'react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {/* Login or Sign-Up form */}
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={toggleAuthMode}>
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
