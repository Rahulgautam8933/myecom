import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import toast from 'react-hot-toast'
import ProductCard from '../productCard/ProductCard'

const OrderDEtails1 = (id) => {
    const token = Cookies.get("UserToken");
    const [orderDetail, setOrderDetails] = useState([])
    const [orderProductList, setOrderProductList] = useState([])
    const orderDetails = async () => {
        // setShow(true)
        // selectedKey("5")
        console.log("orderId", id)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/order/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            // console.log(res);
            setOrderDetails(res?.data?.order)
            setOrderProductList(res?.data?.order?.orderItems)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }

    }


    useEffect(() => {
        orderDetails();
    }, [])


    return (
        <>

            <div className="orderdetails-container"  >

                <div className="">

                    <div className="d-flex" style={{ width: "100%", overflow: "auto" }}>
                        {
                            orderProductList.map((ele, ind) => {
                                return (
                                    <>
                                        <ProductCard
                                            img={ele?.image}
                                            productname={ele?.name}
                                            price={ele?.price}
                                            description={ele?.quantity}

                                        />
                                        <Col className="m-2" xs={12} sm={6} md={4} lg={3}>
                                            <Card className='card-box' >
                                                <img src={ele?.image} />
                                                <div>
                                                    <Card.Title> Product Name:-{ele?.name}</Card.Title>
                                                    <Card.Text className="pcolor">
                                                        Price:-{ele?.price}
                                                    </Card.Text>
                                                    <Card.Text className="pcolor">
                                                        quantity:-{ele?.quantity}
                                                    </Card.Text>
                                                </div>
                                            </Card>
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

        </>
    )
}

export default OrderDEtails1