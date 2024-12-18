// 간단한 암호화/복호화 유틸리티
export function encrypt(text: string): string {
    return btoa(text); // 기본 base64 인코딩
  }
  
  export function decrypt(encoded: string): string {
    return atob(encoded); // 기본 base64 디코딩
  }