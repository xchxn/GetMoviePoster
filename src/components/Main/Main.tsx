import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Main.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

const Main = () => {
  // 영화 정보 가져오기
  // 영화 제목, 포스터, 설명, 평점, 개봉일, 장르
  // 감독, 출연

  // 현재상영작 https://api.themoviedb.org/3/movie/now_playing
  // 인기작품 https://api.themoviedb.org/3/movie/popular
  // 평점 높은 https://api.themoviedb.org/3/movie/top_rated
  // 개봉예정작 https://api.themoviedb.org/3/movie/upcoming

  // 가져오기 예시
  // {
  //   "adult": false,
  //   "backdrop_path": "/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg",
  //   * "genre_ids": [
  //     27,
  //     53
  //   ],
  //   "id": 713704,
  //   "original_language": "en",
  //   * "original_title": "Evil Dead Rise",
  //   * "overview": "Two sisters find an ancient vinyl that gives birth to bloodthirsty demons that run amok in a Los Angeles apartment building and thrusts them into a primal battle for survival as they face the most nightmarish version of family imaginable.",
  //   "popularity": 1696.367,
  //   * "poster_path": "/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg",
  //   * "release_date": "2023-04-12",
  //   * "title": "Evil Dead Rise",
  //   "video": false,
  //   "vote_average": 7,
  //   "vote_count": 207
  // }

  // 디테일 가져오기 https://api.themoviedb.org/3/movie/{movie_id}
  // {
  //   "poster_path": "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
  //   "adult": false,
  //   "overview": "Jack Reacher must uncover the truth behind a major government conspiracy in order to clear his name. On the run as a fugitive from the law, Reacher uncovers a potential secret from his past that could change his life forever.",
  //   "release_date": "2016-10-19",
  //   "genre_ids": [
  //     53,
  //     28,
  //     80,
  //     18,
  //     9648
  //   ],
  //   "id": 343611,
  //   "original_title": "Jack Reacher: Never Go Back",
  //   "original_language": "en",
  //   "title": "Jack Reacher: Never Go Back",
  //   "backdrop_path": "/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg",
  //   "popularity": 26.818468,
  //   "vote_count": 201,
  //   "video": false,
  //   "vote_average": 4.19
  // }

  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const [wishlist, setWishlist] = useState<Movie[]>([]); // wishList 관리

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
      setState(response.data.results);
    } catch (err) {
      setError("영화 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchMovies("/movie/now_playing", setNowPlaying);
    fetchMovies("/movie/popular", setPopular);
    fetchMovies("/movie/top_rated", setTopRated);
    fetchMovies("/movie/upcoming", setUpcoming);
    loadSavedMovies();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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
    console.log("save", localStorage.getItem('wishlist'));
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

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.sectionTitle}>현재 상영작</h2>
      <MovieList movies={nowPlaying} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>

      <h2 className={styles.sectionTitle}>인기 작품</h2>
      <MovieList movies={popular} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>

      <h2 className={styles.sectionTitle}>평점 높은 영화</h2>
      <MovieList movies={topRated} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>

      <h2 className={styles.sectionTitle}>개봉 예정작</h2>
      <MovieList movies={upcoming} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>
    </div>
  );
};

const MovieList: React.FC<{ 
  movies: Movie[];
  onSaveMovie?: (movie: Movie) => void;
  onRemoveMovie?: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;
}> = ({ movies, onSaveMovie, onRemoveMovie, isInWishlist }) => (
  <div className={styles.movieList}>
    {movies.map((movie) => (
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

export default Main;
