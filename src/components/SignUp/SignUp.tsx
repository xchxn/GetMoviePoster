// src/components/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tryRegister } from '../../utils/auth';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 이메일 형식 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    try {
      setError(''); // 이전 에러 메시지 초기화
  
      // 입력값 공백 체크
      if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError('모든 필드를 입력해주세요.');
        return;
      }
  
      // 이메일 형식 검증
      if (!validateEmail(email)) {
        setError('유효한 이메일 형식이 아닙니다.');
        return;
      }
  
      // 비밀번호 일치 여부 확인
      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
  
      // 약관 동의 확인
      if (!agreeTerms) {
        setError('약관에 동의해주세요.');
        return;
      }
  
      // 회원가입 처리
      const result = await tryRegister(email, password);
      
      if (!result.success) {
        setError(result.message);
        return;
      }
  
      toast.success(result.message);
      navigate('/signin');
  
    } catch (error) {
      console.error('회원가입 오류:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('회원가입 처리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.signupcontainer}>
      <h2>회원가입</h2>
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
        />
        약관에 동의합니다
      </label>
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={() => navigate('/signin')}>로그인</button>
    </div>
  );
};

export default SignUp;
