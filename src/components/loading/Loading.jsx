import React from "react";
import "./Loading.css";
import { Spin } from "antd";
const Loading = () => {
  return (
    <div>
      <div className="spin-example">
        <Spin tip="Loading" size="large" style={{ fontSize: "3rem" }} />
      </div>
    </div>
  );
};

export default Loading;
