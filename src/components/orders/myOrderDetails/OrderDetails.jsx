import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Card, Col } from "react-bootstrap";
import ProductCard from "../../productCard/ProductCard";
const OrderDetails = () => {
  let params = useParams();
  const navigator = useNavigate();
  const token = Cookies.get("UserToken");
  const [orderDetail, setOrderDetails] = useState([])
  const [orderProductList, setOrderProductList] = useState([])



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
      setOrderDetails(data?.data?.order)
      setOrderProductList(data?.data?.order?.orderItems)
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
      <div className="myproductcontainer">

        <div className="">

          <div className="">

            <div className="d-flex" style={{ width: "100%", overflow: "auto" }}>
              {
                orderProductList.map((ele, ind) => {
                  return (
                    <>
                      <Col className="m-2" xs={12} sm={6} md={4} lg={3}>

                        <ProductCard
                          img={ele?.image}
                          productname={ele?.name}
                          price={ele?.price}
                          description={ele?.quantity}
                          id={ele?.product}


                        />
                      </Col>

                    </>
                  )
                })
              }


            </div>
            <br />

            <Card >

              <Card.Body>
                <Card.Title>Address </Card.Title>
                <Card.Text className="pcolor m-0">
                  Name:-{orderDetail?.shippingInfo?.name}
                </Card.Text>
                <Card.Text className="pcolor m-0">
                  Address:-{orderDetail?.shippingInfo?.address}
                </Card.Text>
                <Card.Text className="pcolor m-0">
                  City:-{orderDetail?.shippingInfo?.city}
                </Card.Text>
                <Card.Text className="pcolor m-0">
                  mobile:-{orderDetail?.shippingInfo?.mobile}
                </Card.Text>
                <Card.Text className="pcolor m-0">
                  pincode:-{orderDetail?.shippingInfo?.pincode}
                </Card.Text>

              </Card.Body>
            </Card>
            <br />
            <Card >

              <Card.Body>
                <Card.Title>Payment Amount</Card.Title>
                <Card.Text className="pcolor m-0">
                  ShippingPrice:-{orderDetail?.shippingPrice}
                </Card.Text>
                <Card.Text className="pcolor m-0">
                  TotalPrice:-{orderDetail?.totalPrice}
                </Card.Text>


              </Card.Body>
            </Card>

          </div>

        </div>

      </div>
    </>
  );
};

export default OrderDetails;
