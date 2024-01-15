import React from "react";
import "./Profile.css";
import { Col, Row } from "react-bootstrap";
import { useAppState } from "../../context/AppState";
const Profile = () => {
  const { product, loading, profile } = useAppState();
  console.log(profile);
  return (
    <div>
      <p>ghfgh</p>

      <Row>
        <Col className="profileimg">
          <img src={profile?.avatar?.url} alt="" />
        </Col>
        <Col className="profileimg">
          <h4>{profile.name}</h4>
          <h6>{profile.email}</h6>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
