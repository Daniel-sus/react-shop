import React from "react";
import "./BurgerSlider.css";
import cart from "../icons/cart.svg";
import heart from "../icons/heart.svg";
import profile from "../icons/profile.svg";
import logo from "../icons/logo2.png";
import { Link } from "react-router-dom";

const BurgerSlider = (props) => {
  return (
    <div className="green">
      <div className="logodiv">
        <img
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
          src={logo}
          alt="logo"
        />
      </div>
      <div className="cart-wrapperr">
        <div>
          <img
            className="cartt"
            id="cart"
            onClick={props.onClickCart}
            src={cart}
            alt="cart"
          />
        </div>
        <div>
          <Link to={process.env.PUBLIC_URL + "/favourites"}>
            <img className="heart" src={heart} alt="heart" />
          </Link>
        </div>
        <div>
          <Link to={process.env.PUBLIC_URL + "/account"}>
            <img className="profile" src={profile} alt="profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerSlider;
