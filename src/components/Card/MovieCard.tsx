// src/components/MovieCard.tsx
import React from 'react';
import styles from '../Trending/Trending.module.css'


interface MovieProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
}

const MovieCard: React.FC<{ 
    movie:MovieProps;
    onSaveMovie?: (movie: MovieProps) => void;
    onRemoveMovie?: (movieId: number) => void;
    isInWishlist: (movieId: number) => boolean;
  }> = ({ movie, onSaveMovie, onRemoveMovie, isInWishlist }) => {
  return (
    <div key={movie.id} className={styles.movieCard}>
      <img 
        src={`${process.env.REACT_APP_MOVIE_IMAGE_BASE_URL}/w200${movie.poster_path}`} 
        alt={movie.title}
        className={styles.moviePoster}
      />
      <div className={styles.movieInfo}>
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
        <p>Release Date: {movie.release_date}</p>
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
  );
};

export default MovieCard;
