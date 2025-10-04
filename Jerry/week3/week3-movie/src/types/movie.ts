export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// 출연진 및 제작진 기본 정보
export interface Person {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path?: string | null;
  order?: number;
}

// 영화 크레딧 정보
export interface MovieCredits {
  id: number;
  cast: Person[];
  crew: Person[];
}

// 영화 상세 정보
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  tagline: string | null;
}

// API 호출 상태 관리 유틸리티 타입
export type DataState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
