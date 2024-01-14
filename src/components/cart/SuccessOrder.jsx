import React from "react";
import "./Cart.css";
import logo from "../../assets/success-icon-10-300x300.png";
import { useNavigate } from "react-router-dom";
const SuccessOrder = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className=" flexboxcard">
        <img src={logo} alt="" />

        <h4>Your Order is Confirmed!</h4>
        <h6>Thank you for shopping with us!</h6>
        <div className="contentitem1">
          <button onClick={() => navigator("/shop")}>Continue shopping</button>
        </div>
      </div>
    </>
  );
};

export default SuccessOrder;
