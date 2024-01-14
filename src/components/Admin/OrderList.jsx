import { Table, Modal, Select } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const OrderList = () => {
  const token = Cookies.get("UserToken");
  const [orderData, setOrderData] = useState([]);
  const [deletedProductId, setDeletedProductId] = useState(null);
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

  const showConfirmDeleteModal = (orderId) => {
    setConfirmDeleteModal({ visible: true, orderId });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/order/${
          confirmDeleteModal.orderId
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
      dataIndex: "itemsPrice",
      key: "itemsPrice",
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
        </>
      ),
    },
  ];

  return (
    <>
      <h3>Get all Orderlist</h3>
      <Table dataSource={dataSource} columns={columns} />;
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
    </>
  );
};

export default OrderList;
