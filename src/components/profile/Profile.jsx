import React, { useEffect, useState } from "react";
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
  const { profile } = useAppState();
  const token = Cookies.get("UserToken");
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal2Open, setModal2Open] = useState(false);

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",

  });

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
  };



  const submitData = async (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", loginData.name);
    myForm.set("email", loginData.email);
    myForm.set("avatar", avatar);
    try {
      const data = await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/me/update`,
        myForm, {
        headers: {
          Authorization: token
        }
      }
      );

      // Cookies.set("UserToken", data?.data?.token);
      toast.success("User Profile Updated Successfully ");
      console.log(data);

      navigator("/login");
      setLoading(true);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };



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
      handleCloseModal();
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }


  };

  useEffect(() => {
    // setLoginData(profile)
  }, [])


  return (
    <>
      <br />
      <div className="profilecontainer">
        <Row>
          <Col className="">
            <div className="profileimg">
              <img src={profile?.avatar?.url} alt="" />
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
        onOk={submitData}
        onCancel={() => setModal2Open(false)}
      >
        <form>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">Your Name</label>
            <input name="name"
              value={loginData?.name}
              onChange={registerDataChange} type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Name" />
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">Your Email</label>
            <input name="email"
              value={loginData?.email}
              onChange={registerDataChange} type="email" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Password" />
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">Profile</label>
            <input name="avatar"
              accept="image/*"
              onChange={registerDataChange} type="file" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Password" />
            <div className="update-profile-img">

              <img src={avatarPreview} alt="" />
            </div>
          </div>
        </form>
      </Modal>


    </>
  );
};

export default Profile;
