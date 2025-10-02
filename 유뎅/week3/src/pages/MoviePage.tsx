import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieResponse, Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Pagenation } from "../components/pagenation";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태
  const [isPaending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);
  // 3. 페이지
  const [page, setPage] = useState(1);

  const params = useParams();

  useEffect(() => {
    const fetchMovies = async() => {
      setIsPending(true);

      try {
        const {data} = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${params.category}?language=ko-KO&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          }
        }
      );
      setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  },[params.category, page]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    )
  }

  return (
    <>
      <Pagenation page={page} setPage={setPage} />
      {isPaending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isPaending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key= {movie.id} movie={movie} />
        ))}
      </div>
      )}
    </>
  );
}