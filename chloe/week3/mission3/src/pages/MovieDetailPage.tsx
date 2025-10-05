import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [cast, setCast] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!movieId) return;
            
            try {
                const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
                console.log('🔑 API_KEY:', API_KEY); // 👈 추가
                console.log('🎬 movieId:', movieId); // 👈 추가
                const [movieRes, creditsRes] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`),
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
                ]);
                console.log('✅ 영화 데이터:', movieRes.data);

                setMovie(movieRes.data);
                setCast(creditsRes.data.cast.slice(0, 10));
            } catch (error) {
                console.error('❌ API 에러:', error); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [movieId]);

    if (loading) {
        return (
            <div className='min-h-screen bg-black flex items-center justify-center'>
                <div className='text-white text-xl'>Loading...</div>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className='min-h-screen bg-black text-white'>
            {/* 포스터 배경 */}
            <div className='relative h-96'>
                {movie.poster_path && (
                    <img 
                        src={IMAGE_BASE_URL + movie.poster_path}
                        alt={movie.title}
                        className='w-full h-full object-cover opacity-40'
                    />
                )}
                <div className='absolute bottom-0 left-0 p-8'>
                    <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
                    <div className='flex items-center gap-4 text-sm'>
                        <span>평균 {movie.vote_average?.toFixed(1)}</span>
                        <span>{movie.release_date?.slice(0, 4)}</span>
                    </div>
                </div>
            </div>

            {/* 줄거리 */}
            <div className='p-8'>
                <p className='text-gray-300 max-w-4xl'>{movie.overview || '줄거리 정보가 없습니다.'}</p>
            </div>

            {/* 출연진 */}
            <div className='px-8 pb-8'>
                <h2 className='text-2xl font-bold mb-6'>감독/출연</h2>
                <div className='grid grid-cols-5 gap-4'>
                    {cast.map((actor) => (
                        <div key={actor.id} className='text-center'>
                            <div className='w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-800'>
                                {actor.profile_path ? (
                                    <img
                                        src={IMAGE_BASE_URL + actor.profile_path}
                                        alt={actor.name}
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center text-gray-600'>
                                        N/A
                                    </div>
                                )}
                            </div>
                            <p className='mt-2 text-sm font-semibold'>{actor.name}</p>
                            <p className='text-xs text-gray-400'>{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;