// src/utils/auth.ts
export const isAuthenticated = () => Boolean(localStorage.getItem('token'));

export const saveLoginInfo = (email: string, token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem('email', email);
  }
  localStorage.setItem('token', token);
};

export const tryLogin = ( 
  email: string, password:string, token: any, rememberMe: boolean
) => {
  // users 무조건 수정
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find((user: { id: string; password: string; }) => user.id === email && user.password === password);
  if (user) {
    localStorage.setItem('TMDb-Key', user.password); // API 키 저장
    localStorage.setItem('token', token); // 토큰 저장 이양

    if(rememberMe){
      localStorage.setItem('email', email);
    }
    return { success: true, message: "User registered successfully" };
  }
}

export const tryRegister = (
  email: string, password: string
  ) => {
  // users 무조건 수정
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.some((existingUser: { id: string; })  => existingUser.id === email);
  if (!userExists) {
    users.push({ id: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, message: "User registered successfully" };
  } else {
    return { success: false, message: "User already exists" };
  }
}

export const logout = () => {
  if (isAuthenticated()) {
    localStorage.removeItem('token');
    return { success: true, message: "Logout successfully" };
  } else {
    return { success: false, message: "User not logged in" };
  }
}