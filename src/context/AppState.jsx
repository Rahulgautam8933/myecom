// AppState.js
import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  let [product, setProduct] = useState([]);
  let [loading, setLoading] = useState(true);
  let [profile, setProfile] = useState([]);

  const token = Cookies.get("UserToken");

  //

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Implement your logic to add items to the cart
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    // Implement your logic to remove items from the cart
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateItemCount = (index, newCount) => {
    // Implement your logic to update item count in the cart
    const updatedCart = [...cart];
    updatedCart[index].quantity = newCount;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    // Implement your logic to calculate the total price of items in the cart
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  //

  const userdetails = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/me`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data?.data?.user);
      setProfile(data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/products`
      );
      console.log(data.data.products);
      setProduct(data.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        // Handle the case where the stored cart is not an array
        console.error("Invalid cart format:", parsedCart);
      }
    }
  }, [cart, addToCart, removeFromCart, token]);

  useEffect(() => {
    userdetails();
    getProduct();
  }, []);

  const state = {
    product,
    loading,
    cart,
    addToCart,
    removeFromCart,
    updateItemCount,
    calculateTotal,
    profile,
    token,
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

export { AppStateProvider, useAppState };
