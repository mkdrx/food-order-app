import React from "react";

import CartContext from "./cart-context";

// Manage the cart context data and provide that context to all components that want access to it
const CartProvider = (props) => {
  // Add to cart
  const addToCartHandler = (item) => {};

  // Remove from cart
  const removeFromCartHandler = (id) => {};

  const cartCtx = {
    items: [],
    totalAmount: 0,
    addItems: addToCartHandler,
    removeItems: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
