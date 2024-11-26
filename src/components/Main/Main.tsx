import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Main.module.css";
import MovieCard from '../Card/MovieCard';

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

const Main = () => {
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
  <div className={styles.movieGrid}>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onSaveMovie={onSaveMovie}
        onRemoveMovie={onRemoveMovie}
        isInWishlist={isInWishlist}
      />
    ))}
  </div>
);

export default Main;
