import React from "react";
import "./Header.css";
import logo from "../icons/logo.svg";
import logo2 from "../icons/logo2.png";
import cart from "../icons/cart.svg";
import heart from "../icons/heart.svg";
import profile from "../icons/profile.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="left-wrapper">
            <img className="logo" src={logo2} alt="logo" />
            <div className="text-wrapper">
              <div className="header-title">
                <h2 style={{ paddingLeft: "20px" }}>React Sneakers</h2>
              </div>
              {/* <p>магазин лучших кросовок</p> */}
            </div>
          </div>
          <div className="right-wrapper">
            <div
              onClick={props.onClickCart}
              className="cart-wrapper"
              id="cart-wrapper"
            >
              <img className="cart" src={cart} alt="cart" />
              <div className="counter">{props.counter}</div>
              <span className="price-header">$240</span>
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
      </div>
    </div>
  );
};

export default Header;
