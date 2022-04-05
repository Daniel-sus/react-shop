import React, { useContext } from "react";
import "./CartItem.css";
import remove from "../../icons/close.svg";
import AppContext from "../../context";

const CartItem = ({ imageUrl, title, price, id }) => {
  const { deleteItem } = useContext(AppContext);
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
