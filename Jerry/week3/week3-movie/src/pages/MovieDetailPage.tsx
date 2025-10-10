import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { CastCard } from '../components/CastCard';
import { useCustomFetch } from '../hooks/useCustomFetch';
import type { MovieDetails, MovieCredits } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // Custom Hook으로 영화 상세 정보 가져오기
  const movieDetail = useCustomFetch<MovieDetails>(
    movieId ? `${BASE_URL}/${movieId}?language=ko-KR` : null
  );

  // Custom Hook으로 영화 크레딧 정보 가져오기
  const movieCredits = useCustomFetch<MovieCredits>(
    movieId ? `${BASE_URL}/${movieId}/credits?language=ko-KR` : null
  );

  // 로딩 상태 처리
  const isLoading = movieDetail.loading || movieCredits.loading;
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <LoadingSpinner />
        <p className="mt-6 text-white text-xl font-medium animate-pulse">
          영화 정보를 불러오는 중...
        </p>
      </div>
    );
  }

  // 에러 상태 처리
  if (movieDetail.error || movieCredits.error || !movieDetail.data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        <div className="bg-red-500/10 border-2 border-red-500 rounded-2xl p-8 max-w-md">
          <div className="text-6xl mb-4 text-center">⚠️</div>
          <h2 className="text-red-400 text-2xl font-bold text-center mb-2">
            오류가 발생했습니다
          </h2>
          <p className="text-gray-300 text-center">
            {movieDetail.error ||
              movieCredits.error ||
              '알 수 없는 에러가 발생했습니다.'}
          </p>
        </div>
      </div>
    );
  }

  const detail = movieDetail.data;
  const credits = movieCredits.data;

  // 감독 정보 추출
  const director = credits?.crew.find((p) => p.job === 'Director');
  // 주요 출연진 10명 추출
  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* 백드롭 이미지 섹션 - 개선된 디자인 */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 blur-sm"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}${detail.backdrop_path})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

        {/* 영화 제목 및 평점 - 개선된 레이아웃 */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl animate-fade-in">
              {detail.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-lg md:text-xl">
              <span className="flex items-center bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                <span className="text-2xl mr-2">⭐</span>
                <span className="font-bold text-yellow-400">
                  {detail.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300 ml-1 text-sm">/ 10</span>
              </span>
              <span className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
                {detail.release_date}
              </span>
              <span className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                {detail.runtime}분
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 md:p-12 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 포스터 섹션 - 개선된 디자인 */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
                <img
                  src={`${IMAGE_BASE_URL}${detail.poster_path}`}
                  alt={detail.title}
                  className="relative rounded-2xl shadow-2xl w-full transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* 기본 정보 카드 */}
              <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  기본 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">개봉일</p>
                    <p className="text-white font-semibold">
                      {detail.release_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">상영 시간</p>
                    <p className="text-white font-semibold">
                      {detail.runtime}분
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">장르</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {detail.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 콘텐츠 섹션 */}
          <div className="lg:w-2/3 space-y-8">
            {/* 줄거리 */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                줄거리
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {detail.overview || '제공되는 줄거리 정보가 없습니다.'}
              </p>
            </div>

            {/* 감독 */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                감독
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300" />
                  <div className="relative w-20 h-20 rounded-full bg-gray-700 overflow-hidden border-2 border-yellow-500/30">
                    {director?.profile_path ? (
                      <img
                        src={`${IMAGE_BASE_URL}${director.profile_path}`}
                        alt={director.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        👤
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-yellow-400 font-semibold text-sm mb-1">
                    DIRECTOR
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {director?.name || '정보 없음'}
                  </p>
                </div>
              </div>
            </div>

            {/* 주요 출연진 */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                주요 출연진
              </h2>
              {mainCast.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mainCast.map((person) => (
                    <CastCard key={person.id} person={person} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  출연진 정보가 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
