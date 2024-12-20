import { User } from "../types/types";
import { kakaoLogout } from "./social-auth";

// src/utils/auth.ts
export const isAuthenticated = () => {
  const check = Boolean(localStorage.getItem('token') || localStorage.getItem('access_token'));
  return check;
};

export const saveLoginInfo = (email: string, token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem('email', email);
  }
  localStorage.setItem('token', token);
};

export const tryLogin = async (
  email: string, 
  password: string, 
  token: string, 
  rememberMe: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.id === email);

    if (!user) {
      return { success: false, message: "존재하지 않는 아이디입니다." };
    }

    if (user.password !== password) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }

    localStorage.setItem('TMDb-Key', user.apiKey || ''); 
    localStorage.setItem('token', token);
    
    if (rememberMe) {
      localStorage.setItem('email', email);
    }

    return { success: true, message: "로그인 성공" };
  } catch (error) {
    console.error('로그인 처리 중 오류:', error);
    return { success: false, message: "로그인 처리 중 오류가 발생했습니다." };
  }
};

export const tryRegister = async (
  email: string, 
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "유효하지 않은 이메일 형식입니다." };
    }

    // 비밀번호 유효성 검사 (최소 8자, 영문/숫자/특수문자 포함)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return { 
        success: false, 
        message: "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다." 
      };
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.some(user => user.id === email)) {
      return { success: false, message: "이미 존재하는 이메일입니다." };
    }

    users.push({ id: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, message: "회원가입이 완료되었습니다." };
  } catch (error) {
    console.error('회원가입 처리 중 오류:', error);
    return { success: false, message: "회원가입 처리 중 오류가 발생했습니다." };
  }
};

export const logout = async() => {
  const type = localStorage.getItem('auth_type');

  if (type === 'kakao') {
    await kakaoLogout();
    
    window.location.reload();
    
    return { success: true, message: "Logout successfully" };
  } 
  if (!!isAuthenticated()) {
    localStorage.removeItem('email');
    localStorage.removeItem('TMDb-Key'); // API 키 저장
    localStorage.removeItem('token');

    window.location.reload();
    return { success: true, message: "Logout successfully" };
  } else {
    return { success: false, message: "User not logged in" };
  }
}