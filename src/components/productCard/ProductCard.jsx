import React from "react";
import "./ProductCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import img from '../../assets/camera.png'
const ProductCard = ({ img, productname, price, description, id }) => {
  // const truncateDescription = (text, limit) => {
  //     const words = text.split(' ');
  //     return words.slice(0, limit).join(' ');
  // };

  // console.log(id)

  const truncateDescription = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  return (
    <>
      <div className="cardcontainer">
        <Link to={`/details/${id}`}>
          <Card className="card1" style={{ position: "relative" }}>
            <Card.Img className="cardimg" variant="top" src={img} />
            <Card.Body className="card1">
              <h6>{truncateDescription(productname, 15)}</h6>
              <h5>
                {" "}
                ₹ {price} <s>₹ 18000</s>
              </h5>
              <p>{truncateDescription(description, 19)}</p>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
