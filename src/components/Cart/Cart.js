import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  // State for the order button - checkout
  const [isCheckout, setIsCheckout] = useState(false);

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for submission confirmation
  const [didSubmit, setDidSubmit] = useState(false);

  // Using context
  const cartCtx = useContext(CartContext);

  // Total amount
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // Checking if cart is empty or not - to render the button if true
  const hasItems = cartCtx.items.length > 0;

  // Handlers
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    // Set the state of submission as soon as the submit handler is called
    setIsSubmitting(true);

    // Send a POST req to the server with the user data and the ordered items
    await fetch(
      "https://react-http-4b011-default-rtdb.europe-west1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    // Reset states after submission
    setIsSubmitting(false);
    setDidSubmit(true);

    // Using cart context to clear the cart
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // Close and Order buttons from the modal
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  // Cart content
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  // Submitting content
  const isSubmittingModalContent = <p>Sending order data...</p>;

  // Confirmation content
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Order successfully sent!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
