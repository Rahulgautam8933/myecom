import { Modal, Select, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserList = () => {
  const token = Cookies.get("UserToken");
  const [orderData, setOrderData] = useState([]);
  const [deletedProductId, setDeletedProductId] = useState(null);

  const [userData, setUserData] = useState([]);

  const [editUserModal, setEditUserModal] = useState({
    visible: false,
    userId: null,
    selectedRole: "",
  });

  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    visible: false,
    orderId: null,
  });
  console.log(orderData);




  const showEditUserModal = (userId, currentRole) => {
    setEditUserModal({ visible: true, userId, selectedRole: currentRole });
  };

  const handleEditUserOk = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/user/${editUserModal.userId}`,
        {
          role: editUserModal.selectedRole,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setUserData((prevData) =>
        prevData.map((user) =>
          user._id === editUserModal.userId
            ? { ...user, role: editUserModal.selectedRole }
            : user
        )
      );
      toast.success('user roll updated successfuly')
      setEditUserModal({ visible: false, userId: null, selectedRole: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUserCancel = () => {
    setEditUserModal({ visible: false, userId: null, selectedRole: "" });
  };



  const showSingleUserDetail = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/admin/user/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    console.log(id)
  }



  const showConfirmDeleteModal = (orderId) => {
    setConfirmDeleteModal({ visible: true, orderId });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/user/${confirmDeleteModal.orderId
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
  }, [deletedProductId]);

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
          <button onClick={() => showEditUserModal(orderId)} className="btn btn-primary m-1">edit</button>
          <button onClick={() => showSingleUserDetail(orderId)} className="btn btn-primary m-1"> User Details</button>
        </>
      ),
    },
  ];







  // table

  return (
    <>
      <h3>Get all userList</h3>
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
        title="Edit User"
        visible={editUserModal.visible}
        onOk={handleEditUserOk}
        onCancel={handleEditUserCancel}
      >
        <p>Select Role:</p>
        <Select
          value={editUserModal.selectedRole}
          onChange={(value) =>
            setEditUserModal({
              ...editUserModal,
              selectedRole: value,
            })
          }
        >
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Modal>



    </>
  );
};

export default UserList;
