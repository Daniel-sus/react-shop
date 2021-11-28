import React from "react";
import "./CartItem.css";
import remove from "../icons/close.svg";

const CartItem = ({ title, imageUrl, price, id, deleteItem }) => {
  return (
    <div className="cart-item">
      <img className="cart-item-img" src={imageUrl} alt="cart-item" />

      <div className="cart-item-text">
        <div className="cart-item-title">{title}</div>
        <div className="cart-item-price">${price}</div>
      </div>
      <div className="cart-item-btn">
        <img onClick={() => deleteItem(id)} src={remove} alt="snkbtn" />
      </div>
    </div>
  );
};

export default CartItem;
