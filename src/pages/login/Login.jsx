import React, { useState } from "react";
import "./Login.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const Login = () => {
  const navigator = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onchangeInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/login`,
        loginData
      );
      Cookies.set("UserToken", data?.data?.token);
      toast.success("User Login Successfully ");
      console.log(data?.data?.token);
      navigator("/");
      // window.location.reload();
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // gdfjg

  return (
    <>
      <div className="logincontainer">
        <form>
          <span onClick={() => navigator("/")}>
            <RiCloseCircleLine />
          </span>
          <h3>Login</h3>
          <hr />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={loginData.email}
            onChange={onchangeInput}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={loginData.password}
            onChange={onchangeInput}
          />
          <div style={{ textAlign: "left" }}>
            <h6>Forgot your password?</h6>
          </div>
          <button onClick={submitData}>Login</button>
          <button
            onClick={() => navigator("/registration")}
            className="registerbutton"
          >
            Don’t have an account? <p style={{ margin: "0" }}> Register now </p>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
