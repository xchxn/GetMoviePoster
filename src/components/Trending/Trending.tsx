// src/components/Trending.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../Card/MovieCard';
import Pagination from '../Pagination/Pagination';
import styles from './Trending.module.css';

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

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = process.env.REACT_APP_MOVIE_API_URL;

const Trending: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'table' | 'infinite'>('table');

  const [wishlist, setWishlist] = useState<Movie[]>([]); // wishList 관리

  const [moviesPerPage] = useState(5);  // 페이지당 영화 개수

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });
      setMovies((prev) => (view === 'infinite' ? [...prev, ...response.data.results] : response.data.results));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };
  
  // 현재 페이지에 맞는 영화 목록을 계산
  const indexOfLastMovie = page * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleScroll = () => {
    if (view !== 'infinite' || loading) return;

    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 10) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadSavedMovies();
    if (view === 'infinite') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, [view, loading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  }

  // 영화가 wishlist에 포함되어 있는지 확인하는 함수
  const isInWishlist = (movieId: number): boolean => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.viewToggle}>
        <button onClick={() => setView('table')}>Table View</button>
        <button onClick={() => setView('infinite')}>Infinite Scroll View</button>
      </div>
      {view === 'table' ? (
        <>
          <div className={styles.movieGrid}>
            {currentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>
            ))}
          </div>
          <Pagination 
            currentPage={page} 
            onPageChange={setPage}
            totalPages={Math.ceil(movies.length / moviesPerPage)}
            />
        </>
      ) : (
        <div className={styles.infiniteScrollContainer}>
          <div className={styles.movieGrid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSaveMovie={handleSaveMovie} onRemoveMovie={handleRemoveMovie} isInWishlist={isInWishlist}/>
            ))}
          </div>
          {loading && <div className={styles.loading}>Loading...</div>}
          <button className={styles.topButton} onClick={scrollToTop}>
            Top
          </button>
        </div>
      )}
    </div>
  );
};

export default Trending;