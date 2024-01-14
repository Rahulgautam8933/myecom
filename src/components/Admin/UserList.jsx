import { Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const token = Cookies.get("UserToken");
  const [orderData, setOrderData] = useState([]);

  console.log(orderData);

  const orderlist = async () => {
    try {
      const respons = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(respons);
      setOrderData(respons.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderlist();
  }, []);

  // table
  const dataSource = orderData;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: () => (
        <>
          <button className="btn btn-primary m-1">delete</button>
          <button className="btn btn-primary m-1">edit</button>
        </>
      ),
    },
  ];
  // table

  return (
    <>
      <h3>Get all userList</h3>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
};

export default UserList;
