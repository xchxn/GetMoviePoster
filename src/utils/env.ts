// src/utils/env.ts
export const isDevelopment = () => process.env.REACT_APP_ENV === 'development';
export const isProduction = () => process.env.REACT_APP_ENV === 'production';

export const getApiUrl = () => process.env.REACT_APP_MOVIE_API_URL;
export const getKakaoRedirectUrl = () => process.env.REACT_APP_KAKAO_API_AUTH_REDIRECT_URL;