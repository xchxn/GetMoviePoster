// src/utils/auth.ts
export const isAuthenticated = () => Boolean(localStorage.getItem('token'));

export const saveLoginInfo = (email: string, token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem('email', email);
  }
  localStorage.setItem('token', token);
};
