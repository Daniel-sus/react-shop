import React from "react";
import "./Header.css";
import logo2 from "../icons/logo2.png";
import cart from "../icons/cart.svg";
import heart from "../icons/heart.svg";
import profile from "../icons/profile.svg";
import { Link } from "react-router-dom";
import ball from "../icons/ball.svg";
import ball2 from "../icons/ball2.svg";
import AppContext from "../context";

const Header = (props) => {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);
  return (
    <div className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="left-wrapper">
            <div className="logowrapper">
              <img className="logo" src={logo2} alt="logo" />
              <img className="ball" src={ball} alt="ball" />
              <img className="ball2" src={ball2} alt="ball2" />
            </div>

            <div className="text-wrapper">
              <div className="header-title">
                <h2 style={{ paddingLeft: "20px" }}>React Sneakers</h2>
              </div>
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
              <span className="price-header">${totalPrice}</span>
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
      </div>
    </div>
  );
};

export default Header;
