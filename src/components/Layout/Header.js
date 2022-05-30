import { Fragment } from "react";

import classes from "./Header.module.css";
import headerImg from "../../assets/food.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={headerImg} alt="Table with food!"></img>
      </div>
    </Fragment>
  );
};

export default Header;
