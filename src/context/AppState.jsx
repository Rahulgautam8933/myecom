// AppState.js
import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  let [product, setProduct] = useState([]);
  let [loading, setLoading] = useState(true);
  let [profile, setProfile] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const token = Cookies.get("UserToken");
  const [cart, setCart] = useState([]);

  const addToCart = (detailData, count) => {
    if (detailData) {
      const { _id, name, price, images, Stock } = detailData;
      const updatedCart = [
        ...cart,
        {
          product: _id,
          name,
          price,
          image: images[0].url,
          stock: Stock,
          quantity: count,
        },
      ];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    toast.success("Successfully Added To Cart");

  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    toast.success("Cart Item Removed");
  };


  // const updateCartCount = () => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     const parsedCart = JSON.parse(storedCart);
  //     setCartCount(parsedCart.length);
  //   }
  // };

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

    userdetails();
    getProduct();
  }, []);

  useEffect(() => {
    // Update cart count when cart changes
    setCartCount(cart.length);
  }, [cart]);

  // useEffect(() => {

  // }, []);

  const state = {
    product,
    loading,
    cart,
    addToCart,
    removeFromCart,
    updateItemCount,
    calculateTotal,
    profile,
    cartCount,
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
