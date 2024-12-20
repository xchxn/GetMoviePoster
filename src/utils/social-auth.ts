import axios from 'axios';
import { KakaoPropertyKeys } from '../types/types';

export const kakaoLogin = async () => {
  window.location.href = `${process.env.REACT_APP_KAKAO_API_AUTH_URL}?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_API_AUTH_REDIRECT_URL}&response_type=code`;
};

export const kakaoLoginCallback = async () => {
  const authorize_code = new URL(window.location.href).searchParams.get('code');
  const url = new URL(window.location.href);
  console.log(authorize_code);
  console.log(url.href);
  
  if (authorize_code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.REACT_APP_KAKAO_API_KEY || '');
    params.append('redirect_uri', process.env.REACT_APP_KAKAO_API_AUTH_REDIRECT_URL || '');
    params.append('code', authorize_code);
    await axios.post(`${process.env.REACT_APP_KAKAO_API_AUTH_TOKEN_URL}`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
        })
      .then((response) => {
        console.log(response.data);

        localStorage.setItem('auth_type', 'kakao');
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        return { success: true, message: "User registered successfully" };
      });
    return { success: true, message: "User registered successfully" };
  }
  else return { success: false, message: "Authorize_code isn't exists" };
}

export const kakaoLogout = async() => {
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams();

  await axios
    .post(`${process.env.REACT_APP_KAKAO_API_AUTH_LOGOUT_URL}`, params ,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    },
  )
    .then((response) => {
      console.log(response.data);

      localStorage.removeItem('auth_type');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
    });

    return { success: true, message: "Logout successfully" };
};

export const getKaKaoUserProfile = async () => {
  const propertyKeys: KakaoPropertyKeys[] = ["kakao_account.profile"];
  const params = new URLSearchParams();
  // JSON ARRAY를 활용
  params.append('property_keys', JSON.stringify(propertyKeys));
  
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_KAKAO_API_GET_USER_URL}`,
      params,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      }
    );
    
    console.log('사용자 프로필:', response.data);
    localStorage.setItem('username', response.data.kakao_account.profile.nickname);
    return { success: true, message: "Get User Profile successfully" };
  } catch (error) {
    console.error('프로필 가져오기 실패:', error);
    return { success: false, message: "Failed to get user profile" };
  }
}