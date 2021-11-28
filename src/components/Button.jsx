import React from "react";
import "./Button.css";
import arrow from "../icons/arrow-btn.svg";
import AppContext from "../context";

const Button = () => {
  const { setCartOpened } = React.useContext(AppContext);
  const closeCart = () => {
    setCartOpened(false);
  };

  return (
    <div className="all-pages-btn" onClick={closeCart}>
      <img src={arrow} className="arrow-fix" alt="назад" />
      <div>Return back</div>
    </div>
  );
};

export default Button;
