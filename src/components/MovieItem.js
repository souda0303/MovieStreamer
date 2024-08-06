import React from 'react';
import { Link } from 'react-router-dom';
import './MovieItem.css';

// Mapping of language codes to language names
const languageMap = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  // Add more languages as needed
};

const MovieItem = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const languageName = languageMap[movie.original_language] || movie.original_language;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-image-container">
          <img
            src={posterUrl}
            alt={movie.title}
            className="movie-image"
          />
        </div>
        <div className="movie-title-container">
          <h3>{movie.title}</h3>
        </div>
        <div
          className="movie-details-overlay"
          style={{ backgroundImage: `url(${posterUrl})`, backgroundSize: "cover" }} // Set background image dynamically
        >
          <div className="movie-details-card">
            <h3>{movie.title}</h3>
            <p>Released Date: {movie.release_date}</p>
            <p>Language: {languageName}</p>
            <p>Ratings: {(movie.vote_average / 2).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
