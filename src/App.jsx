import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Registeration from "./pages/login/Registeration";
import ProductList from "./components/productList/ProductList";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./components/cart/Cart";
import CheckOut from "./components/cart/CheckOut";
import { Toaster } from "react-hot-toast";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import SuccessOrder from "./components/cart/SuccessOrder";
import MyOrders from "./components/orders/myOrders/MyOrders";
import OrderDetails from "./components/orders/myOrderDetails/OrderDetails";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/Admin/Dashboard";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registeration />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
          <Route path="/success" element={<SuccessOrder />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/myOrder/:id" element={<OrderDetails />} />
          <Route path="/admin" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
