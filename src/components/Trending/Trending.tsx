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
}

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = process.env.REACT_APP_MOVIE_API_URL;

const Trending: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'table' | 'infinite'>('table');

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });
      setMovies((prev) => (view === 'infinite' ? [...prev, ...response.data.results] : response.data.results));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.viewToggle}>
        <button onClick={() => setView('table')}>Table View</button>
        <button onClick={() => setView('infinite')}>Infinite Scroll View</button>
      </div>

      {view === 'table' ? (
        <>
          <div className={styles.movieGrid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination currentPage={page} onPageChange={setPage} />
        </>
      ) : (
        <div className={styles.infiniteScrollContainer}>
          <div className={styles.movieGrid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
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
