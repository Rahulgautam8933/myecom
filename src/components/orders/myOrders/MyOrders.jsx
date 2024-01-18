import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import Cookies from "js-cookie";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const navigator = useNavigate();
  const token = Cookies.get("UserToken");
  const [orders, setOrders] = useState([]);

  const getorders = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/orders/me`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data.data.orders);
      setOrders(data.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActionClick = (record) => {
    let orderId = record._id;
    navigator(`/myOrder/${orderId}`);
    console.log("Order ID clicked:", orderId);
  };

  const dataSource = [...orders];
  const columns = [
    {
      title: "OrderId",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Action",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleActionClick(record)}>
          Get Details
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getorders();
  }, []);

  return (
    <>
      <div className="myproductcontainer">
        <h1>My Orders</h1>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </>
  );
};

export default MyOrders;
