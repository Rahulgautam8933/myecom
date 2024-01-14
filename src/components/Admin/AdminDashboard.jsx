import React from "react";

const AdminDashboard = () => {
  return (
    <>
      <div className="dashBoard-Container">
        <h6 className="text-center p-4 bg-primary text-white">Total Income</h6>

        <div className="total-values-container d-flex justify-content-center">
          <p
            style={{ width: "5rem", height: "5rem" }}
            className="text-primary p-3 rounded-circle bg-info m-1"
          ></p>
          <p
            style={{ width: "5rem", height: "5rem" }}
            className="text-primary p-3 rounded-circle bg-info m-1"
          >
            Order
          </p>
          <p
            style={{ width: "5rem", height: "5rem" }}
            className="text-primary p-3 rounded-circle bg-info m-1"
          >
            User
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
