// src/components/MovieCard.tsx
import React from 'react';
import styles from '../Trending/Trending.module.css'


interface MovieProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
  };
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div className={styles.movieCard}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <div className={styles.movieInfo}>
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
        <p>Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
