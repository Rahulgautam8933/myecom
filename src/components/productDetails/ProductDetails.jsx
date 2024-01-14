import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "react-rating";
import StarRatings from "react-star-ratings";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";

const ProductDetails = () => {
  let id = useParams();

  const [detailData, setDetailsData] = useState([]);
  const [reviews, setReviews] = useState([]);
  // console.log(reviews);
  const [count, setCount] = useState(1);

  const dicrementCount = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const [cart, setCart] = useState([]);

  const details = async () => {
    try {
      //   const data = await axios.get(`https://dummyjson.com/products/${id.id}`);
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

  const options = {
    size: "large",
    value: 2,
    readOnly: true,
    precision: 0.5,
  };

  // const addToCart = () => {
  //   if (detailData) {
  //     const updatedCart = [...cart, { ...detailData, count }];
  //     setCart(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   }
  //   toast.success("Successfully Added To Cart");
  // };

  const addToCart = () => {
    if (detailData) {
      const { _id, name, price, images, Stock } = detailData;
      const updatedCart = [
        ...cart,
        {
          product: _id,
          name,
          price,
          image: images[0].url,
          stock: Stock,
          quantity: count,
        },
      ];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    toast.success("Successfully Added To Cart");
    window.location.reload();
  };

  useEffect(() => {
    // Retrieve cart details from localStorage when the component mounts
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

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
                <button>Buy Now</button>
                <button onClick={addToCart}>Add To Cart</button>
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
