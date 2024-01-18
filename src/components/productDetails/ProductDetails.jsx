import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Card from "react-bootstrap/Card";
import ReactStars from "react-rating-stars-component";
import Cookies from "js-cookie";
import { useAppState } from "../../context/AppState";

const ProductDetails = () => {
  let id = useParams();
  const token = Cookies.get("UserToken");
  const { addToCart } = useAppState();
  const [detailData, setDetailsData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        productId: id.id,
        comment,
        rating,
      };
      await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/review`,
        reviewData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setShowReviewModal(false);
      setComment("");
      setRating(0);
      details();
    } catch (error) {
      console.log(error);

    }
  };

  const dicrementCount = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const details = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/product/${id.id}`
      );
      console.log(data?.data?.product);
      setDetailsData(data?.data?.product);
      setReviews(data?.data?.product?.reviews);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    details();
  }, []);

  return (
    <>
      <div className="productDetails">
        <div className="detailsup">
          <Row>
            <Col
              sm={12}
              md={6}
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <img
                style={{ width: "70%" }}
                src={detailData?.thumbnail?.url}
                alt="img"
              />
            </Col>
            <Col sm={12} md={6} className="productDetails1">
              <h4>{detailData?.name}</h4>
              <h3>₹ {detailData?.price}</h3>
              <hr />
              <h6>{detailData?.description}</h6>
              <h5>Brand: {detailData?.brand}</h5>
              <h5>Category: {detailData?.category}</h5>
              <h5>
                <StarRatings
                  rating={detailData?.ratings}
                  starRatedColor="orange"
                  starDimension="30px"
                  starSpacing="3px"
                />
              </h5>
              <br />
              <div className="productCount">
                <button onClick={dicrementCount}>-</button>
                <input
                  type="Number"
                  value={count}
                  onChange={(e) => e.target.value}
                />
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <br />
              <div
                className="contentitem"
                style={{ display: "flex", gap: "18px" }}
              >
                <button onClick={() => setShowReviewModal(true)}>Review</button>
                {/* Review Modal */}
                <Modal
                  show={showReviewModal}
                  onHide={() => setShowReviewModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formComment">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formRating">
                        <Form.Label>Rating:</Form.Label>
                        <ReactStars
                          count={5}
                          onChange={(newRating) => setRating(newRating)}
                          size={44}
                          activeColor="#ffd700"
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowReviewModal(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleReviewSubmit}>
                      Submit Review
                    </Button>
                  </Modal.Footer>
                </Modal>
                <button onClick={() => addToCart(detailData, count)}>Add To Cart</button>
              </div>
            </Col>
          </Row>
        </div>

        <div className="reviewscontainer">
          <br />
          <br />
          <h1>Reviews</h1>
          <hr />
        </div>
        <div className="reviesboxs">
          <Row>
            {reviews.map((ele, ind) => {
              return (
                <>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <Card.Body>
                        <h3>{ele?.name}</h3>
                        <span>{ele?.comment}</span>
                        <h5>
                          <StarRatings
                            rating={ele?.rating}
                            starRatedColor="orange"
                            starDimension="30px"
                            starSpacing="3px"
                          />
                        </h5>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
