import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./Search.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
}

const Search = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [wishlist, setWishlist] = useState<Movie[]>([]); // wishList 관리

  // 필터 목록
  // adult, genre, release_date, vote_average
  const [adult, setAdult] = useState<boolean>(false);
  const [genre, setGenre] = useState<number | null>(null);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [voteAverage, setVoteAverage] = useState<number | null>(null);

  // 초기화 옵션

  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (
    endpoint: string,
    setState: React.Dispatch<React.SetStateAction<Movie[]>>
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API_URL}${endpoint}`,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );
      console.log(response.data);
      setState(response.data.results);
    } catch (err) {
      setError("영화 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchMovies("/movie/popular", setPopular);
    loadSavedMovies();
  }, []);

  // wishlist를 위한 로컬 스토리지 관리
  // localStorage에서 저장된 영화 목록을 불러옴
  const loadSavedMovies = () => {
    const wishlists = localStorage.getItem("wishlist");
    if (wishlists) {
      setWishlist(JSON.parse(wishlists));
    }
  };

  // 영화를 localStorage에 저장하는 함수
  const handleSaveMovie = (movie: Movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    console.log("save", localStorage.getItem("wishlist"));
  };

  // 저장된 영화 목록을 삭제하는 함수
  const handleRemoveMovie = (movieId: number) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // 영화가 wishlist에 포함되어 있는지 확인하는 함수
  const isInWishlist = (movieId: number): boolean => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  // 필터링 적용 함수
  const filterMovies = (movies: Movie[]) => {
    return movies.filter((movie) => {
      const meetsAdult = adult || !movie.adult;
      const meetsGenre = genre ? movie.genre_ids.includes(genre) : true;
      const meetsReleaseDate = releaseDate
        ? movie.release_date >= releaseDate
        : true;
      const meetsVoteAverage = voteAverage
        ? movie.vote_average >= voteAverage
        : true;
      return meetsAdult && meetsGenre && meetsReleaseDate && meetsVoteAverage;
    });
  };

  const resetFilters = () => {
    setAdult(false);
    setGenre(null);
    setReleaseDate("");
    setVoteAverage(null);
  };

  // 필터링된 영화 목록을 useMemo로 캐싱하여 성능 최적화
  const filteredMovies = useMemo(
    () => filterMovies(popular),
    [popular, adult, genre, releaseDate, voteAverage]
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <h3 className={styles.filterTitle}>필터 옵션</h3>
        <label className={styles.filterTitle}>
          <input
            type="checkbox"
            checked={adult}
            onChange={() => setAdult(!adult)}
          />
          성인 포함
        </label>
        <label className={styles.filterTitle}>
          장르:
          <select
            value={genre ?? ""}
            onChange={(e) =>
              setGenre(e.target.value ? Number(e.target.value) : null)
            }
            className={styles.filterDropdown}
          >
            <option value="">전체</option>
            <option value="28">액션</option>
            <option value="35">코미디</option>
            <option value="18">드라마</option>
            {/* 추가 장르 옵션 */}
          </select>
        </label>
        <label className={styles.filterTitle}>
          개봉일:
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className={styles.filterDropdown}
          />
        </label>
        <label className={styles.filterTitle}>
          평점 이상:
          <input
            type="number"
            value={voteAverage ?? ""}
            min="0"
            max="10"
            step="0.1"
            onChange={(e) =>
              setVoteAverage(e.target.value ? Number(e.target.value) : null)
            }
            className={styles.filterDropdown}
          />
        </label>
        <button className={styles.filterButton} onClick={resetFilters}>
          필터 초기화
        </button>
      </div>
      <h2 className={styles.sectionTitle}>찾기</h2>
      <MovieList
        movies={popular}
        onSaveMovie={handleSaveMovie}
        onRemoveMovie={handleRemoveMovie}
        isInWishlist={isInWishlist}
        filters={{ adult, genre, releaseDate, voteAverage }}
      />
    </div>
  );
};

const MovieList: React.FC<{
  movies: Movie[];
  onSaveMovie?: (movie: Movie) => void;
  onRemoveMovie?: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;
  filters: {
    adult: boolean;
    genre: number | null;
    releaseDate: string;
    voteAverage: number | null;
  };
}> = ({ movies, onSaveMovie, onRemoveMovie, isInWishlist, filters }) => {
  // 필터 조건을 적용하여 영화 목록 필터링
  const filteredMovies = movies.filter((movie) => {
    const meetsAdult = filters.adult || !movie.adult;
    const meetsGenre = filters.genre
      ? movie.genre_ids.includes(filters.genre)
      : true;
    const meetsReleaseDate = filters.releaseDate
      ? movie.release_date >= filters.releaseDate
      : true;
    const meetsVoteAverage = filters.voteAverage
      ? movie.vote_average >= filters.voteAverage
      : true;
    return meetsAdult && meetsGenre && meetsReleaseDate && meetsVoteAverage;
  });

  return (
    <div className={styles.movieList}>
      {filteredMovies.map((movie) => (
        <div key={movie.id} className={styles.movieItem}>
          <img
            src={`${process.env.REACT_APP_MOVIE_IMAGE_BASE_URL}/w200${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
          <h3 className={styles.movieTitle}>{movie.title}</h3>
          <div className={styles.movieDetails}>
            <p>평점: {movie.vote_average}</p>
            <p>개봉일: {movie.release_date}</p>
            <p>{movie.overview}</p>
            {isInWishlist(movie.id) ? (
              <button
                className={styles.removeButton}
                onClick={() => onRemoveMovie?.(movie.id)}
              >
                💔
              </button>
            ) : (
              <button
                className={styles.saveButton}
                onClick={() => onSaveMovie?.(movie)}
              >
                ❤
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
