import axios from 'axios';

export const kakaoLogin = async () => {
  window.location.href = `${process.env.REACT_APP_KAKAO_API_AUTH_URL}?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_API_AUTH_REDIRECT_URL}&response_type=code`;
};

export const kakaoLoginCallback = () => {
  const authorize_code = new URL(window.location.href).searchParams.get('code');

  if (authorize_code) {
    axios.post(`${process.env.REACT_APP_KAKAO_API_TOKEN_URL}`, {
        grant_type: 'authorization_code',
        client_id: `${process.env.REACT_APP_KAKAO_API_KEY}`,
        redirect_uri: `${process.env.REACT_APP_KAKAO_API_AUTH_REDIRECT_URL}`,
        code: authorize_code,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
      });
  }
  return window.location.href = `http://localhost:3000`;
}

export const kakaoLogout = async () => {
  await axios
    .post(`${process.env.REACT_APP_KAKAO_API_LOGOUT_URL}`, {
      access_token: localStorage.getItem('access_token'),
    })
    .then((response) => {
      console.log(response.data);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    });
};