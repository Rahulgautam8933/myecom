import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const navigator = useNavigate();

  const storedAddress = JSON.parse(localStorage.getItem("ShippingAddress")) || {
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  };

  const [ShippingAddress, setShippingAddress] = useState(storedAddress);

  const setAdd = (e) => {
    setShippingAddress({ ...ShippingAddress, [e.target.name]: e.target.value });
  };

  const saveAddress = (e) => {
    e.preventDefault();
    localStorage.setItem("ShippingAddress", JSON.stringify(ShippingAddress));
    navigator("/confirmOrder");
  };

  //   "shippingInfo": {
  //     "address": "basant vihar lucknow",
  //     "city": "lucknow",
  //     "state": "up",
  //     "country": "india",
  //     "pinCode": 226021,
  //     "phoneNo": 1234567890
  // },

  return (
    <>
      <div className="checkoutContainer">
        <Row
          style={{
            textAlign: "center",
            position: "relative",
            padding: "0.5rem",
            width: "400px",
            margin: "auto",
          }}
        >
          <Col
            className="addressdata"
            style={{
              textAlign: "center",
              position: "relative",
              padding: "0.5rem",
              width: "290px",
              margin: "auto",
            }}
          >
            <h5>Address</h5>
            <hr style={{ width: "6rem", margin: "auto" }} />
            <form>
              <div className="inputs">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={ShippingAddress.name}
                  onChange={setAdd}
                />
              </div>
              <div className="inputs">
                <label>Mobile</label>
                <input
                  type="Number"
                  placeholder="Number"
                  name="mobile"
                  value={ShippingAddress.mobile}
                  onChange={setAdd}
                />
              </div>
              <div className="inputs">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Area"
                  name="address"
                  value={ShippingAddress.address}
                  onChange={setAdd}
                />
              </div>
              <div className="inputs">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={ShippingAddress.city}
                  onChange={setAdd}
                />
              </div>
              <div className="inputs">
                <label>Pincode</label>
                <input
                  type="Number"
                  placeholder="Pincode"
                  name="pincode"
                  value={ShippingAddress.pincode}
                  onChange={setAdd}
                />
              </div>
              <div className="inputs">
                <h3>Payment Method</h3>
                <select name="" id="">
                  <option value="cash">Cash On Delivery</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div className="inputs">
                <br />
                <div
                  className="contentitem1"
                  style={{ display: "flex", gap: "18px" }}
                >
                  <button onClick={saveAddress}>Continue</button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CheckOut;
