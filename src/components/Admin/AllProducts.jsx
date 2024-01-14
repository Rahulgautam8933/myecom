import { Table } from "antd";
import React from "react";

const AllProducts = () => {
  // table
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  // table

  return (
    <>
      <h3>Get all product</h3>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
};

export default AllProducts;
