import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCustomFetch } from '../hooks/useCustomFetch.ts';

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  // Custom Hook으로 영화 데이터 가져오기
  const { data, loading, error } = useCustomFetch<MovieResponse>(
    category
      ? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
      : null,
    { dependencies: [page, category] }
  );

  const movies: Movie[] = data?.results || [];

  // 에러 처리
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        <div className="bg-red-500/10 border-2 border-red-500 rounded-2xl p-8 max-w-md">
          <div className="text-6xl mb-4 text-center">⚠️</div>
          <h2 className="text-red-400 text-2xl font-bold text-center mb-2">
            오류가 발생했습니다
          </h2>
          <p className="text-gray-300 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* 페이지네이션 컨트롤 */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-gray-900/80 border-b border-purple-500/30 py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {category === 'now_playing' && '현재 상영중'}
              {category === 'popular' && '인기 영화'}
              {category === 'top_rated' && '높은 평가'}
              {category === 'upcoming' && '개봉 예정'}
            </h1>

            <div className="flex items-center gap-4">
              <button
                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg
                hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-30
                disabled:cursor-not-allowed disabled:hover:shadow-none font-semibold"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <span className="relative z-10">← 이전</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <span className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-500/30 font-bold text-lg min-w-[120px] text-center">
                {page} 페이지
              </span>

              <button
                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg
                hover:shadow-purple-500/50 transition-all duration-300 font-semibold"
                onClick={() => setPage((prev) => prev + 1)}
              >
                <span className="relative z-10">다음 →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <LoadingSpinner />
          <p className="mt-6 text-white text-xl font-medium animate-pulse">
            영화 목록을 불러오는 중...
          </p>
        </div>
      )}

      {/* 영화 목록 */}
      {!loading && (
        <div className="container mx-auto p-6 md:p-10">
          {movies.length > 0 ? (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-gray-400 text-xl">영화 정보가 없습니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
