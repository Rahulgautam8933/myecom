import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllProducts = () => {


  const [product, setProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/products`);
      console.log(res.data.products)
      setProduct(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProduct();
  }, [])


  // table
  const dataSource =
    product
    ;

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "Stock",
      key: "Stock",
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (orderId) => (
        <>
          <button

            className="btn btn-primary m-1"
          >
            delete
          </button>
          <button

            className="btn btn-primary m-1"
          >
            update
          </button>

        </>
      ),
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
