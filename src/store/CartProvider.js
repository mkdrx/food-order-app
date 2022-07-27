import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Receives two arguments: latest state snapshot and the action triggered by dispatch
const cartReducer = (state, action) => {
  // Logic when dispatching add item from cart
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // Returns the index (if exists) if the item we looking in the array has the same id as the item we dispatching/adding
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // In case the item already exists in cart, increases the amount - doesn't create duplicates of the item itself
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      // In case the item is added for the first time in cart, adds it
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // Logic when dispatching remove item from cart
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

// Manage the cart context data and provide that context to all components that want access to it
const CartProvider = (props) => {
  // Calling the useReducer hook - reducer function and initial state
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  // Add to cart
  const addToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  // Remove from cart
  const removeFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  // Clear the cart
  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
