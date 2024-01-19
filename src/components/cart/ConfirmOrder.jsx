import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Card, Col, Row } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";

import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const ConfirmOrder = () => {
  const navigator = useNavigate();

  const [cart, setCart] = useState([]);
  const [add, setAdd] = useState();
  const [token, settoken] = useState(0);

  console.log(cart);
  console.log("dfgdfgdfgdfgdg", add);
  console.log("tokens", token);



  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const order = {
    shippingInfo: add,
    orderItems: cart,
    itemsPrice: calculateTotal(),
    taxPrice: 0,
    shippingPrice: 50,
    totalPrice: calculateTotal() + 50,
  };

  console.log("order", order);

  const orderNow = async () => {
    try {
      order.paymentInfo = {
        id: "dfgdfghdfg",
        status: "successed",
      };
      const data = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/order/new`,
        {
          ...order,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(data);
      toast.success(" Order Placed Successfully ");
      navigator("/success");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      navigator('/login')
      console.log(error);
    }

    // dispatch(createOrder(order));
    // console.log("orderNow");
    // history.push("/success");
  };

  useEffect(() => {
    const token = Cookies.get("UserToken");
    const storedCart = localStorage.getItem("cart");

    const orderInfo = JSON.parse(localStorage.getItem("ShippingAddress"));
    setAdd(orderInfo);
    settoken(token);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        // Handle the case where the stored cart is not an array
        console.error("Invalid cart format:", parsedCart);
      }
    }
  }, []);

  return (
    <>
      <div className="checkoutContainer">
        <Row>
          <Col style={{ padding: "1rem 2rem" }}>
            <h3>Shipping Info</h3>
            <p className="m-0">Name:- {add?.name}</p>
            <p className="m-0">Mobile Number:- <b>+91</b>{add?.mobile}</p>
            <p className="m-0">Address:- {add?.address} {add?.city} {add?.pincode} </p>

            <h3>Your Cart Items</h3>

            <div>
              <br />
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cart.map((item, index) => (
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col
                        xs={2}
                        md={2}
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
                      <Col md={3}>
                        <h5>{item?.name}</h5>
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        {item?.price} X {item?.quantity} =
                        {item?.price * item?.quantity}
                      </Col>
                    </Row>
                  ))}

                  <br />
                </ul>
              )}
            </div>
          </Col>
          <Col
            md={5}
            style={{
              textAlign: "center",
              padding: "2rem 4rem",
              borderLeft: "1px solid black",
            }}
          >
            <h2>Order Summery</h2>
            <hr />
            <div className="summarybox">
              <span>Subtotal:</span>
              <span>₹ {calculateTotal()}</span>
            </div>
            <br />
            <div className="summarybox">
              <span>Delivery Charge:</span>
              <span>+₹50</span>
            </div>
            <br />
            <hr />

            <div className="summarybox">
              <span>Total:</span>
              <span>₹{calculateTotal() + 50}</span>
            </div>

            <br />
            <hr />
            <br />
            <div
              className="contentitem1"
              style={{ display: "flex", gap: "18px" }}
            >
              <button onClick={orderNow}>Continue</button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConfirmOrder;
