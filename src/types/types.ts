export interface SearchOptions {
  [key: string]: string;  // 인덱스 시그니처 추가
  originalLanguage: string;
  translationLanguage: string;
  sorting: string;
}

export interface User {
  id: string;
  password: string;
  apiKey?: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  original_language: string;
  vote_average: number;
  backdrop_path?: string;
  overview?: string;
}

interface APIResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type KakaoPropertyKeys = 
  | "kakao_account.profile"
  | "kakao_account.email"
  | "kakao_account.age_range"
  | "kakao_account.birthday"
  | "kakao_account.gender";