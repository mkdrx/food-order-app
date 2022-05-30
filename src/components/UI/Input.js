import React from "react";

import classes from "./Input.module.css";

// forwardRef so ref is usable inside a custom component - to forward that ref to that input
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
