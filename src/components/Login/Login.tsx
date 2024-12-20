// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { tryLogin } from '../../utils/auth';
import styles from './Login.module.css';
import { kakaoLogin } from '../../utils/social-auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setError(''); // 이전 에러 메시지 초기화
  
      if (!email.trim() || !password.trim()) {
        setError('이메일과 비밀번호를 모두 입력해주세요.');
        return;
      }
  
      if (!validateEmail(email)) {
        setError('유효한 이메일 형식이 아닙니다.');
        return;
      }
  
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API_URL}/authentication/token/new`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`,
            accept: 'application/json'
          }
        }
      );
  
      const token = response.data.request_token;
      if (!token) {
        throw new Error('인증 토큰을 받아오지 못했습니다.');
      }
  
      const loginResult = await tryLogin(email, password, token, rememberMe);
      
      if (!loginResult.success) {
        setError(loginResult.message);
        return;
      }
  
      toast.success(loginResult.message);
      navigate('/');
  
    } catch (error) {
      console.error('로그인 오류:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('로그인 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleKakaoLogin = async () => {
    try {
      await kakaoLogin();

      toast.success('로그인 성공!');

      navigate('/');
    } catch (error) {
      setError('카카오 로그인에 실패했습니다.');
    }
  };

  return (
    <div className={styles.logincontainer}>
      <h2>로그인</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        Remember me
      </label>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </div>
  );
};

export default Login;