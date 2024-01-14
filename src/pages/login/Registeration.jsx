import React, { useState } from "react";
import "./Login.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { render } from "react-dom";
const Registeration = () => {
  const navigator = useNavigate();
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [loading, setLoading] = useState(true);

  console.log("profile", avatar);
  const onchangeInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

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
    myForm.set("password", loginData.password);
    myForm.set("avatar", avatar);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/register`,
        myForm
      );

      // Cookies.set("UserToken", data?.data?.token);
      toast.success("User Registration Successfully ");
      console.log(data);

      navigator("/login");
      setLoading(true);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Please fill all the feild");
    }
  };

  return (
    <>
      <div className="logincontainer">
        <form>
          <span onClick={() => navigator("/")}>
            <RiCloseCircleLine />
          </span>
          <h3>Registration</h3>
          <hr />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={loginData.name}
            onChange={registerDataChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={loginData.email}
            onChange={registerDataChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={loginData.password}
            onChange={registerDataChange}
          />
          <lable style={{ textAlign: "left" }}>
            <sh5>profile</sh5>
          </lable>
          <input
            className="file"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={registerDataChange}
          />
          <button onClick={submitData}>Register</button>
          <button
            onClick={() => navigator("/login")}
            className="registerbutton"
          >
            have already an account <p style={{ margin: "0" }}> Login</p>
          </button>
        </form>
      </div>
    </>
  );
};

export default Registeration;
