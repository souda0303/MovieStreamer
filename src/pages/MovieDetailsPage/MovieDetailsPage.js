import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Container, Typography, Button } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import "./MovieDetailsPage.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=81f382d33088c6d52099a62eab51d967&language=en-US`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="loading-container">
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (!movie) {
    return <Typography variant="h6">Movie not found</Typography>;
  }

  const genreNames = movie.genres.map((genre) => genre.name);
  const languageNames = movie.spoken_languages.map((lang) => lang.name);
  const ratingStars = movie.vote_average / 2;

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <div className="movie-details-container">
        <div
          className="movie-details"
          style={{
            "--background-image": `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <Typography variant="h2" className="movie-details-title">
            {movie.title}
          </Typography>
          <Typography variant="h6" className="movie-details-description">
            {movie.overview}
          </Typography>
          <Button
            variant="contained"
            className="movie-details-button"
            sx={{
              backgroundColor: "black",
              borderRadius: "35px",
            }}
          >
            Play Now
          </Button>
        </div>
      </div>
      <div className="description-section">
        <Typography variant="h5">Description</Typography>
        <Typography>{movie.overview}</Typography>
      </div>
      <div className="movie-additional-details">
        <div className="movie-detail-section">
          <Typography variant="h5">
            <CalendarTodayOutlinedIcon className="detail-icon" /> Released Year
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#5B5B5B",
              marginTop: "10px",
            }}
          >
            {movie.release_date.split("-")[0]}
          </Typography>
        </div>
        <div className="movie-detail-section">
          <Typography variant="h5">
            <TranslateOutlinedIcon className="detail-icon" /> Available
            Languages
          </Typography>
          <div className="languages">
            {languageNames.map((lang) => (
              <span className="language-badge" key={lang}>
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div className="movie-detail-section">
          <Typography variant="h5">
            <StarOutlineOutlinedIcon className="detail-icon" /> Ratings
          </Typography>
          <div className="ratings">
            <div className="rating">
              <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                IMDb
              </Typography>
              <div className="rating-stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`star ${
                      index < Math.floor(ratingStars)
                        ? "full"
                        : index < ratingStars
                        ? "partial"
                        : ""
                    }`}
                    style={
                      index === Math.floor(ratingStars)
                        ? { "--fill": `${(ratingStars % 1) * 100}%` }
                        : {}
                    }
                  >
                    ★
                  </span>
                ))}
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", marginTop: "5px", color: "white" }}
                >
                  {(movie.vote_average / 2).toFixed(1)}
                </Typography>{" "}
              </div>
            </div>
            <div className="rating">
              <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                Streamvibe
              </Typography>
              <div className="rating-stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`star ${index < 4 ? "full" : ""}`}
                  >
                    ★
                  </span>
                ))}
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", marginTop: "5px", color: "white" }}
                >
                  4
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-detail-section">
          <Typography variant="h5">
            <GridViewIcon className="detail-icon" /> Genres
          </Typography>
          <div className="genres">
            {genreNames.map((genre) => (
              <span className="genre-badge" key={genre}>
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MovieDetailsPage;
