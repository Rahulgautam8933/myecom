import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
// import logo from "../imgs/logo.png";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <>
      <div className="w-full">
        <div style={{ width: "90%", margin: "auto" }} className="">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 sx-8">
              <img src="/" alt="logo" className="footer-logo" />
              <p className="footer-text">
                Welcome to QuickBid, your trusted partner in revolutionising the
                tender bid preparation process.
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 sx-8">
              <h3 className="margin footer-heading">Our Products</h3>
              <p className="footer-text">
                QuickBid offers a user-friendly web application and Android
                mobile app with features designed to enhance your bidding
                experience.
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 sx-8">
              <h3 className="margin footer-heading">Important Links </h3>
              <p className="footer-text-link m-0">About</p>
              <p className="footer-text-link m-0">Solution</p>
              <p className="footer-text-link m-0">Pricing</p>
              <p className="footer-text-link m-0">Careers</p>
              <p className="footer-text-link m-0">Contact Us</p>
            </div>
          </div>
          <hr />
          <div className="row pb-3">
            <div className="col-sm-6 col-xs-6">
              <p style={{ cursor: "pointer" }} className="footer-text">
                Terms and Conditions , Privacy Policy , Refund Policy
              </p>
            </div>

            <div className="col">
              <div className="footer-icons-container">
                <div className="footer-icons">
                  <FaYoutube />
                </div>
                <div className="footer-icons">
                  <FaInstagram />
                </div>
                <div className="footer-icons">
                  <FaFacebookF />
                </div>
                <div className="footer-icons">
                  <FaTwitter />
                </div>
                <div className="footer-icons">
                  <FaLinkedinIn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
