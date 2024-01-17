import { Table, Modal, Select } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './Dashboard.css'
import { Card, Col, Row } from "react-bootstrap";
const OrderList = () => {
  const token = Cookies.get("UserToken");
  const [orderData, setOrderData] = useState([]);
  const [deletedProductId, setDeletedProductId] = useState(null);
  const [orderDetail, setOrderDetails] = useState([])
  const [orderProductList, setOrderProductList] = useState([])
  const [show, setShow] = useState(false)
  console.log("orderData", orderData)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    visible: false,
    orderId: null,
  });

  const [editOrderModal, setEditOrderModal] = useState({
    visible: false,
    orderId: null,
    selectedStatus: "",
  });

  const orderlist = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/orders`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setOrderData(response.data.orders);

    } catch (error) {
      console.log(error);
    }
  };

  const orderDetails = async (id) => {
    setShow(true)

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

  const showConfirmDeleteModal = (orderId) => {
    setConfirmDeleteModal({ visible: true, orderId });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/order/${confirmDeleteModal.orderId
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setDeletedProductId(confirmDeleteModal.orderId);
      setConfirmDeleteModal({ visible: false, orderId: null });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteModal({ visible: false, orderId: null });
  };

  const updateOrder = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/order/${orderId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      // If you want to update the UI after editing, you can call orderlist() again or update the state accordingly
    } catch (error) {
      console.log(error);
    }
  };

  const showEditOrderModal = (orderId) => {
    setEditOrderModal({ visible: true, orderId, selectedStatus: "" });
  };

  const handleEditOrderOk = () => {
    updateOrder(editOrderModal.orderId, editOrderModal.selectedStatus);
    setEditOrderModal({ visible: false, orderId: null, selectedStatus: "" });
  };

  const handleEditOrderCancel = () => {
    setEditOrderModal({ visible: false, orderId: null, selectedStatus: "" });
  };

  useEffect(() => {
    orderlist();
  }, [deletedProductId]); // Add deletedProductId to the dependency array

  // table
  const dataSource = orderData;

  const columns = [
    {
      title: "User",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "orderStatus",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (orderId) => (
        <>
          <button
            onClick={() => showConfirmDeleteModal(orderId)}
            className="btn btn-primary m-1"
          >
            delete
          </button>
          <button
            onClick={() => showEditOrderModal(orderId)}
            className="btn btn-primary m-1"
          >
            edit
          </button>
          <button
            onClick={() => orderDetails(orderId)}
            className="btn btn-primary m-1"
          >
            Order Details
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <h3>Get all Orderlist</h3>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Confirm Delete"
        visible={confirmDeleteModal.visible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this order?</p>
      </Modal>
      <Modal
        title="Edit Order"
        visible={editOrderModal.visible}
        onOk={handleEditOrderOk}
        onCancel={handleEditOrderCancel}
      >
        <p>Select Status:</p>
        <Select
          value={editOrderModal.selectedStatus}
          onChange={(value) =>
            setEditOrderModal({
              ...editOrderModal,
              selectedStatus: value,
            })
          }
        >
          <Select.Option value="Shipped">Shipped</Select.Option>
          <Select.Option value="Delivered">Delivered</Select.Option>
        </Select>
      </Modal>


      <div className={show ? "orderdetails-container" : "d-none1"} >
        <div className="closebutton">

          <button onClick={() => setShow(false)}>close</button>
        </div>
        <div className="">

          <div className="d-flex" style={{ width: "100%", overflow: "auto" }}>
            {
              orderProductList.map((ele, ind) => {
                return (
                  <>
                    <Col className="m-2" xs={12} sm={6} md={4} lg={3}>
                      <Card >
                        <Card.Img variant="top" src={ele?.image} />
                        <Card.Body>
                          <Card.Title> Product Name:-{ele?.name}</Card.Title>
                          <Card.Text className="pcolor">
                            Price:-{ele?.price}
                          </Card.Text>
                          <Card.Text className="pcolor">
                            quantity:-{ele?.quantity}
                          </Card.Text>
                        </Card.Body>
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
  );
};

export default OrderList;
