import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { CastCard } from '../components/CastCard';
import type { MovieDetails, MovieCredits, DataState } from '../types/movie';

// 미션 3은 주석을 좀 더 열심히 달았습니다..

// API 기본 URL 및 이미지 기본 URL
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

// 데이터 상태 초기값
const initialDataState: DataState<any> = {
  data: null,
  loading: true,
  error: null,
};

const MovieDetailPage = () => {
  // useParams를 사용하여 URL에서 movieId 값 가져오기
  const { movieId } = useParams<{ movieId: string }>();

  // 영화 상세 정보 상태 관리
  const [movieDetail, setMovieDetail] =
    useState<DataState<MovieDetails>>(initialDataState);

  // 영화 크레딧 (출연진/제작진) 상태 관리
  const [movieCredits, setMovieCredits] =
    useState<DataState<MovieCredits>>(initialDataState);

  // API 호출 함수
  useEffect(() => {
    // movieId가 유효하지 않으면 API 호출을 막기
    if (!movieId) {
      setMovieDetail((prev) => ({
        ...prev,
        loading: false,
        error: '영화 ID가 제공되지 않았습니다.',
      }));
      return;
    }

    const fetchMovieData = async () => {
      setMovieDetail((prev) => ({ ...prev, loading: true, error: null }));
      setMovieCredits((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // 상세 정보 API 호출
        const detailPromise = axios.get<MovieDetails>(
          `${BASE_URL}/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        // 크레딧 정보 API 호출
        const creditsPromise = axios.get<MovieCredits>(
          `${BASE_URL}/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        // Promise.all을 사용해 두 API 호출을 병렬로 처리
        const [detailResponse, creditsResponse] = await Promise.all([
          detailPromise,
          creditsPromise,
        ]);

        // 데이터 상태 업데이트
        setMovieDetail({
          data: detailResponse.data,
          loading: false,
          error: null,
        });
        setMovieCredits({
          data: creditsResponse.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        // 에러 처리
        console.error('API 호출 중 에러 발생:', error);
        setMovieDetail((prev) => ({
          ...prev,
          loading: false,
          error: '영화 상세 정보를 불러오는 데 실패했습니다.',
        }));
        setMovieCredits((prev) => ({
          ...prev,
          loading: false,
          error: '영화 크레딧 정보를 불러오는 데 실패했습니다.',
        }));
      }
    };

    fetchMovieData();
  }, [movieId]);

  // 로딩 상태 표시
  const isLoading = movieDetail.loading || movieCredits.loading;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <LoadingSpinner />
        <p className="ml-4 text-white">영화 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태 표시
  if (movieDetail.error || movieCredits.error || !movieDetail.data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <span className="text-red-500 text-2xl font-bold">
          {movieDetail.error || movieCredits.error || '알 수 없는 에러 발생'}
        </span>
      </div>
    );
  }

  // 데이터 구조분해 할당 (UI 렌더링을 위해)
  const detail = movieDetail.data;
  const credits = movieCredits.data;

  // 감독 정보 추출
  const director = credits?.crew.find((p) => p.job === 'Director');
  // 주요 출연진 10명 추출
  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 백드롭 이미지 섹션 */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}/${detail.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        {/* 영화 제목 및 평점 */}
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-5xl font-extrabold mb-2 text-white drop-shadow-lg">
            {detail.title}
          </h1>
          <p className="text-xl font-semibold text-yellow-400">
            ⭐ 평점: {detail.vote_average.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
        {/* 포스터 및 기본 정보 */}
        <div className="md:w-1/3 flex flex-col items-center">
          <img
            src={`${IMAGE_BASE_URL}/${detail.poster_path}`}
            alt={detail.title}
            className="rounded-xl shadow-2xl w-full max-w-xs md:max-w-none transform hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="mt-6 text-center w-full">
            <h3 className="text-2xl font-bold mb-2 text-gray-200">기본 정보</h3>
            <p className="text-lg">**개봉일:** {detail.release_date}</p>
            <p className="text-lg">**상영 시간:** {detail.runtime}분</p>
            <p className="text-lg">
              **장르:** {detail.genres.map((g) => g.name).join(', ')}
            </p>
          </div>
        </div>

        {/* 줄거리 및 크레딧 섹션 */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">
            줄거리
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {detail.overview || '제공되는 줄거리 정보가 없습니다.'}
          </p>

          <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">
            주요 인물
          </h2>

          {/* 감독 */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
              {director?.profile_path ? (
                <img
                  src={`${IMAGE_BASE_URL}/${director.profile_path}`}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs">
                  NO IMG
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-400">감독</p>
              <p className="text-2xl font-extrabold">
                {director?.name || '정보 없음'}
              </p>
            </div>
          </div>

          {/* 출연진 목록 */}
          <h3 className="text-2xl font-bold mb-4 mt-6">주요 출연진</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {mainCast.map((person) => (
              <CastCard key={person.id} person={person} />
            ))}
            {mainCast.length === 0 && (
              <p className="text-gray-400">출연진 정보가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
