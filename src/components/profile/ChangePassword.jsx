import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ChangePassword = ({ showModal, handleClose, handlePasswordChange }) => {
  const [formdata, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onchangeform = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                name="oldPassword"
                value={formdata.oldPassword}
                onChange={onchangeform}
                type="password"
                placeholder="Enter old password"
                // Bind the value to the state variable
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="newPassword"
                value={formdata.newPassword}
                onChange={onchangeform}
                type="password"
                placeholder="Enter new password"
                // Bind the value to the state variable
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                value={formdata.confirmPassword}
                onChange={onchangeform}
                type="password"
                placeholder="Confirm new password"
                // Bind the value to the state variable
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handlePasswordChange(formdata)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePassword;
