import React, { useEffect, useState } from "react";
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
}


const Search = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [wishlist, setWishlist] = useState<Movie[]>([]); // wishList 관리

  // 필터 목록
  // adult, genre, release_date, vote_average

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
    fetchMovies("/movie/popular", setPopular);
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
      <div className={styles.filterContainer}>

      </div>
      <h2 className={styles.sectionTitle}>인기 작품</h2>
      <MovieList movies={popular} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>
    </div>
  );
}

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

export default Search;