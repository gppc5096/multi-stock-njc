import { encrypt, decrypt } from './encryption';

const PASSWORD_KEY = 'app_password';
const AUTH_SESSION = 'isAuthenticated';
const INITIAL_PASSWORD_FLAG = 'is_initial_password';

export const setPassword = (password: string, isInitial: boolean = false) => {
  const encryptedPass = encrypt(password);
  localStorage.setItem(PASSWORD_KEY, encryptedPass);
  
  // 최초 비밀번호 플래그 설정
  if (isInitial) {
    localStorage.setItem(INITIAL_PASSWORD_FLAG, 'true');
  } else {
    localStorage.removeItem(INITIAL_PASSWORD_FLAG);
  }
};

export const getPassword = () => {
  const encryptedPass = localStorage.getItem(PASSWORD_KEY);
  return encryptedPass ? decrypt(encryptedPass) : null;
};

export const verifyPassword = (input: string) => {
  const storedPassword = getPassword();
  return storedPassword === input;
};

export const isInitialPassword = () => {
  return localStorage.getItem(INITIAL_PASSWORD_FLAG) === 'true';
};

export const hasPassword = () => {
  return !!getPassword();
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem(AUTH_SESSION);
};

export const setAuthenticated = () => {
  sessionStorage.setItem(AUTH_SESSION, 'true');
};

export const logout = () => {
  sessionStorage.removeItem(AUTH_SESSION);
};