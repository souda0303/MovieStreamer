import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MovieItem from "../../components/MovieItem.js";
import "./HomePage.css";

const HomePage = ({ onSearch, searchQuery }) => {
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const thrillerResponse = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=1"
        );
        const comedyResponse = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=2"
        );
        const dramaResponse = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=3"
        );

        setThrillerMovies(thrillerResponse.data.results);
        setComedyMovies(comedyResponse.data.results);
        setDramaMovies(dramaResponse.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = [
        ...thrillerMovies,
        ...comedyMovies,
        ...dramaMovies,
      ].filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  }, [searchQuery, thrillerMovies, comedyMovies, dramaMovies]);

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <div className="hero-container">
        <div className="hero">
          <div className="hero-image">
            <Typography variant="h2" className="hero-text">
              MovieStreamer
            </Typography>
            <Typography
              variant="h5"
              className="hero-subtext"
              fontSize={"40px"}
              fontWeight={"500"}
            >
              Enjoy Watching
            </Typography>
            <Typography variant="h6" className="hero-content">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enimad minim veniam, quis nostrud exerci
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enimad minim veniam, quis nostrud exerc.
              <br />
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enimad minim veniam, quis nostrud exerci
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enimad minim veniam, quis nostrud exerci.
            </Typography>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          {searchQuery && filteredMovies.length > 0 && (
            <Section title="Filtered Results" movies={filteredMovies} />
          )}
          {searchQuery === "" && (
            <>
              <Section title="Thriller" movies={thrillerMovies} />
              <Section title="Drama" movies={dramaMovies} />
              <Section title="Comedy" movies={comedyMovies} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

const Section = ({ title, movies }) => (
  <div className="section">
    <div className="section-header">
      <Typography
        variant="h4"
        className="title"
        fontSize={"20px"}
        fontWeight={"400"}
      >
        {title}
      </Typography>
      <div className="line-arrow">
        <hr className="line" />
        <ArrowForwardIosIcon className="arrow" />
      </div>
    </div>
    <div className="scroll-container">
      {movies.map((movie) => (
        <div className="movie-item" key={movie.id}>
          <MovieItem movie={movie} />
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;
