import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Receives two arguments: latest state snapshot and the action triggered by dispatch
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
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
  return defaultCartState;
};

// Manage the cart context data and provide that context to all components that want access to it
const CartProvider = (props) => {
  // Calling the useReducer hook - reducer function and initial state
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  // Add to cart
  const addToCartHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", item: item });
  };

  // Remove from cart
  const removeFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  };

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
