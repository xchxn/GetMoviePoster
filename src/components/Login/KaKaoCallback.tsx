// src/components/Login/KakaoCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKaKaoUserProfile, kakaoLoginCallback } from '../../utils/social-auth';

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        const result = await kakaoLoginCallback();
        console.log('카카오 로그인 처리 중...', result);
        
        if (result.success) {
          await getKaKaoUserProfile();
          navigate('/');
        } else {
          console.error('카카오 로그인 실패:', result.message);
          navigate('/signin');
        }
      } catch (error) {
        console.error('카카오 로그인 처리 중 오류가 발생했습니다:', error);
        navigate('/signin');
      }
    };

    processKakaoLogin();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>카카오 로그인 처리 중...</p>
    </div>
  );
};

export default KakaoCallback;