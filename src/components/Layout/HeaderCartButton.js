import React, { useContext } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  // Using the context - by using useContext the HeaderCartButton will be reevaluated whenever the context changes (CartProvider)
  const cartCtx = useContext(CartContext);

  // Accessing to cart items - reduce method to reduce the numCartItems to a single number
  // Reduces the array to a single value and executes a provided function for each value of the array
  // and the return value of the function is stored in an accumulator
  const numCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
