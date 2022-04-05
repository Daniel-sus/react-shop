import React from "react";
import "./Header.css";
import logo from "../../icons/logo2.png";
import cart from "../../icons/cart.svg";
import heart from "../../icons/heart.svg";
import profile from "../../icons/profile.svg";
import { Link } from "react-router-dom";
import AppContext from "../../context";

const Header = (props) => {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);
  return (
    <div className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="left-wrapper">
            <Link to={process.env.PUBLIC_URL + "/"}>
              <div className="logowrapper">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </Link>
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
