import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const OrderDetails = () => {
  let params = useParams();
  const navigator = useNavigate();
  const token = Cookies.get("UserToken");

  const getDetails = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/order/${params.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  console.log("product details", params.id);

  return (
    <>
      <div className="myproductcontainer">product details</div>
    </>
  );
};

export default OrderDetails;
