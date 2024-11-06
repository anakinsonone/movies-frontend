import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper } from "@mui/material";
import { Button } from "react-bootstrap";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";
import "./hero.css";

const Hero = ({ movies }) => {
  const navigate = useNavigate();

  const reviews = (movieId) => {
    navigate(`/reviews/${movieId}`);
  };
  return (
    <div>
      <Carousel>
        {movies.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link to={`/trailer/${movie.trailerLink.slice(-11)}`}>
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>
                      <div className="movie-review-button-container">
                        <Button
                          variant="info"
                          onClick={() => reviews(movie.imdbId)}
                        >
                          Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
