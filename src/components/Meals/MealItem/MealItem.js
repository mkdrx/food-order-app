import React, { useContext } from "react";

import CartContext from "../../../store/cart-context";
import MealForm from "./MealForm";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  // Call useContext
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  // Add to cart
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
