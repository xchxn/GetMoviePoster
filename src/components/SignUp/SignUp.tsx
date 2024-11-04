// src/components/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    setError('');

    // 입력 검증
    if (!validateEmail(email)) {
      setError('유효한 이메일 형식이 아닙니다.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreeTerms) {
      setError('약관에 동의하셔야 합니다.');
      return;
    }

    try {
      // 회원가입 로직 구현 (백엔드 API 호출 예시)
      // 실제 API가 있다면 아래를 수정하여 연결하세요.
      // const response = await axios.post('YOUR_SIGNUP_API_URL', { email, password });

      // 회원가입 성공 시 처리
      toast.success('회원가입 성공!');
      navigate('/signin');
    } catch (error) {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      {error && <p className="error">{error}</p>}
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
