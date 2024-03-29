import React, { useEffect, useState } from "react";
import "./Header.css";
import { Col, Row } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { IoBasketOutline } from "react-icons/io5";
import logo from "../../assets/logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Cart from "../cart/Cart";
import { useAppState } from "../../context/AppState";
const Header = () => {
  const navigator = useNavigate();

  const { product,
    loading,
    cart,
    addToCart,
    removeFromCart,
    updateItemCount,
    calculateTotal,
    // updateCartCount,
    cartCount,
    profile,
    token, } = useAppState();
  // const [cartCount, setCartCount] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  // const [token, setToken] = useState(null);
  // const updateCartCount = () => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     const parsedCart = JSON.parse(storedCart);
  //     setCartCount(parsedCart.length);
  //   }
  // };

  const logout = () => {
    Cookies.remove("UserToken");
    toast.success("User Logout Successfully ");
    navigator("/");
  };

  useEffect(() => {
    // const token = Cookies.get("UserToken");
    // setToken(token);
    // updateCartCount(); // Initial update
  }, []);
  return (
    <>
      <div className="navbarcontainer">
        <Row>
          <Col className="navmenu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/">Services</Link>
              </li>
              <li>
                <Link to="/">Contact </Link>
              </li>
            </ul>

            <div onClick={() => navigator("/shop")} className="menubar">
              <GiHamburgerMenu />
            </div>
          </Col>
          <Col
            style={{
              textAlign: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="imglogo">
              <img src={logo} alt="logo" />
            </div>
          </Col>
          <Col
            style={{
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <div className="profile">
              <span id="profile">
                <CgProfile />
                <div className="cards" id="cards">
                  {!token ? (
                    <p onClick={() => navigator("/login")}>
                      <span>
                        <FaUnlock />
                      </span>
                      login
                    </p>
                  ) : (
                    <p onClick={logout}>
                      <span>
                        <FaUnlock />
                      </span>
                      LogOut
                    </p>
                  )}

                  <p onClick={() => navigator("/profile")}>
                    <span>
                      <FaUser />
                    </span>
                    Profile
                  </p>

                  {profile?.role == "admin" ? (
                    <p onClick={() => navigator("/admin")}>
                      <span>
                        <FaUser />
                      </span>
                      Admin
                    </p>
                  ) : (
                    ""
                  )}

                  <p onClick={() => navigator("/myOrders")}>
                    <span>
                      <FaUser />
                    </span>
                    My orders
                  </p>
                </div>
              </span>
              <span className="carticon">
                <IoBasketOutline onClick={() => setSidebar(false)} />
                <span>{cartCount}</span>
              </span>
            </div>
          </Col>
        </Row>

        <div className={sidebar ? "cart-sidebar-block" : "cart-sidebar "}>
          <Cart setSidebar={setSidebar} />
        </div>
      </div>
    </>
  );
};

export default Header;
