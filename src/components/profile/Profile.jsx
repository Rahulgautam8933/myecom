import React, { useState } from "react";
import "./Profile.css";
import { Col, Row } from "react-bootstrap";
import img1 from "../../assets/camera.jpg";
import { useAppState } from "../../context/AppState";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Button, Modal } from "antd";
const Profile = () => {
  const { product, loading, profile } = useAppState();
  const token = Cookies.get("UserToken");
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal2Open, setModal2Open] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePasswordChange = async (formdata) => {
    console.log(formdata);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/password/update`,
        {
          ...formdata,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("password updated successfully");
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }

    // Implement logic to send data to update API
    // Use oldPassword, newPassword, and confirmPassword state variables
    // Close the modal afterward
    handleCloseModal();
  };
  // console.log(profile);
  return (
    <>
      <p>ghfgh</p>
      <div className="profilecontainer">
        <Row>
          <Col className="">
            <div className="profileimg">
              <img src={img1} alt="" />
            </div>
          </Col>
          <Col className=" contentitem">
            <h4>{profile.name}</h4>
            <h6>{profile.email}</h6>
            <br />
            <div className="d-flex gap-2">
              <button onClick={() => setModal2Open(true)}>Edit Profile</button>
              <button onClick={handleShowModal}>Change password</button>
            </div>
          </Col>
          <ChangePassword
            showModal={showModal}
            handleClose={handleCloseModal}
            handlePasswordChange={handlePasswordChange}
          />
        </Row>
      </div>




      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >

      </Modal>


    </>
  );
};

export default Profile;
