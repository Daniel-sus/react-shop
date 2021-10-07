import React from "react";
import "./CartItem.css";
import remove from "../icons/close.svg";

const CartItem = (props) => {
  return (
    <div className="cart-item">
      <img className="cart-item-img" src={props.imageUrl} alt="cart-item" />

      <div className="cart-item-text">
        <div className="cart-item-title">{props.title}</div>
        <div className="cart-item-price">{props.price} руб.</div>
      </div>
      <div className="cart-item-btn">
        <img
          onClick={() => props.deleteItem(props.item)}
          src={remove}
          alt="snkbtn"
        />
      </div>
    </div>
  );
};

export default CartItem;
