import React, { useEffect, useState } from 'react';
import styles from "./Wish.module.css";
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


const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]); // wishList 관리

  const [error, setError] = useState<string | null>(null);

   // localStorage에서 저장된 영화 목록을 불러옴
   const loadSavedMovies = () => {
    const wishlists = localStorage.getItem("wishlist");
    if (wishlists) {
      setWishlist(JSON.parse(wishlists));
    }
  };

  // 컴포넌트가 마운트될 때 영화 목록 로드
  useEffect(() => {
    loadSavedMovies();
  }, []);

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


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className={styles.mainContainer}>
      <h2 className={styles.sectionTitle}>WishList</h2>
      <MovieList movies={wishlist} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie}  isInWishlist={isInWishlist}/>
    </div>
    </div>
  );
}

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
           isInWishlist={isInWishlist}/>
        ))}
  </div>
);

export default Wishlist;