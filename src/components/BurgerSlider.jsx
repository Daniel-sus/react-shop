import React from "react";
import "./BurgerSlider.css";
import cart from "../icons/cart.svg";
import heart from "../icons/heart.svg";
import profile from "../icons/profile.svg";
import logo from "../icons/logo2.png";
import { Link } from "react-router-dom";

const BurgerSlider = () => {
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
      <div className="cart-wrapper">
        <div>
          <img className="cart" id="cart" src={cart} alt="cart" />
        </div>
        <div>
          <Link to="/favourites">
            <img className="heart" src={heart} alt="heart" />
          </Link>
        </div>
        <div>
          <Link to="/account">
            <img className="profile" src={profile} alt="profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerSlider;
