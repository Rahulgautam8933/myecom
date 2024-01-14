// AppState.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  let [product, setProduct] = useState([]);
  let [loading, setLoading] = useState(true);

  //

  const [cart, setCart] = useState([]);

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
  }, []);

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
