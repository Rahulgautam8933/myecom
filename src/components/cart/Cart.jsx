import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Card, Col, Row } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/AppState";
const Cart = ({ setSidebar }) => {
  const navigator = useNavigate();

  const {
    product,
    loading,
    cart,
    addToCart,
    removeFromCart,
    updateItemCount,
    calculateTotal,
  } = useAppState();

  // const [cart, setCart] = useState([]);

  // console.log(cart);

  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     const parsedCart = JSON.parse(storedCart);
  //     if (Array.isArray(parsedCart)) {
  //       setCart(parsedCart);
  //     } else {
  //       // Handle the case where the stored cart is not an array
  //       console.error("Invalid cart format:", parsedCart);
  //     }
  //   }
  // }, []);

  // const removeFromCart = (index) => {
  //   const updatedCart = [...cart];
  //   updatedCart.splice(index, 1);
  //   setCart(updatedCart);

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  // const updateItemCount = (index, newCount) => {
  //   const updatedCart = [...cart];
  //   updatedCart[index].quantity = newCount;
  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  // const calculateTotal = () => {
  //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  // let [count, setCount] = useState(1);

  // const dicrementCount = () => {
  //   if (quantity === 1) {
  //     setCount(1);
  //   } else {
  //     setCount(quantity - 1);
  //   }
  // };

  const gocheckout = () => {
    navigator("/checkOut");
    setSidebar(true);
  };

  return (
    <>
      <div className="cartcontainer">
        <div>
          <h1 onClick={() => setSidebar(true)}>
            <MdClose />
          </h1>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <Card
                  style={{ padding: "1rem", margin: "0.7rem 0rem" }}
                  key={index}
                >
                  <Row>
                    <Col
                      xs={12}
                      md={3}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ width: "100%" }}
                        src={item?.image}
                        alt="img"
                      />
                    </Col>
                    <Col>
                      <h5>{item?.name}</h5>
                      <span>{item?.description}</span>
                      <h4 style={{ color: "red" }}>₹ {item?.price}</h4>
                      <div className="productCount">
                        <button
                          onClick={() =>
                            updateItemCount(
                              index,
                              Math.max(1, item?.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          readOnly
                          type="Number"
                          value={item?.quantity}
                          onChange={(e) =>
                            updateItemCount(index, parseInt(e.target.value, 10))
                          }
                        />
                        <button
                          onClick={() =>
                            updateItemCount(index, item?.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <br />
                    </Col>
                    <Col xs={2} md={1} style={{ textAlign: "right" }}>
                      <h4 onClick={() => removeFromCart(index)}>
                        <RiDeleteBin6Line />
                      </h4>
                    </Col>
                  </Row>
                </Card>
              ))}

              <br />
              <Row>
                <Col>
                  <h5>Gross Total</h5>
                </Col>

                <Col style={{ color: "red", textAlign: "right" }}>
                  <h5>₹ {calculateTotal()}</h5>
                  <br />
                  <div className="contentitem">
                    <button onClick={gocheckout}>Check Out</button>
                  </div>
                </Col>
              </Row>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
