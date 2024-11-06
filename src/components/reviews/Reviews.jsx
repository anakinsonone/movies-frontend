import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const reviewText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    const review = reviewText.current;

    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: review.value,
        imdbId: movieId,
      });
      console.log(response.data);

      const updateReviews = [...reviews, { body: review.value }];
      review.value = "";
      setReviews(updateReviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={movie?.poster} alt={movie?.title} />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    reviewText={reviewText}
                    labelText="Write a review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r, idx) => {
            return (
              <div key={idx}>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
