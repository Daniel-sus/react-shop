import React, { Fragment } from "react";
import "./SideBar.css";
import close from "../../icons/close.svg";
import CartItem from "../cartitem/CartItem";
import box from "../../icons/box.svg";
import list from "../../icons/list.svg";
import arrow2 from "../../icons/arrow.svg";
import "../account/Account.css";
import AppContext from "../../context";
import Button from "../button/Button";
import axios from "axios";

const SideBar = () => {
  const { cartItems, setCartItems, setCartOpened, cartOpened } =
    React.useContext(AppContext);

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const [orderId, setOrderId] = React.useState(null);

  const orderComplete = async () => {
    try {
      const { data } = await axios.post(
        `https://613397247859e700176a3760.mockapi.io/orders`,
        { cartItems }
      );
      setOrderId(data.id);
      setCartItems([]);
      setIsOrderComplete(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://613397247859e700176a3760.mockapi.io/cart/" + item.id
        );
      }
    } catch (error) {
      alert("Не удалось создать заказ");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);

  return (
    <div className="sidebar">
      {cartItems.length > 0 ? (
        <Fragment>
          <div className="close-wrapper">
            <h2>Cart</h2>
            <img onClick={() => setCartOpened(false)} src={close} alt="close" />
          </div>
          <div className="cartitemsdiv">
            <div className="items">
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} {...cartItem} />
              ))}
            </div>
          </div>
          <div className="final-wrapper">
            <div className="final-price">
              <div className="fn-text">Total:</div>
              <div className="fn-empty"></div>
              <div className="fn-price">${totalPrice} </div>
            </div>
            <div className="final-taxes">
              <div className="fn-text">Taxes 5%: </div>
              <div className="fn-empty"></div>
              <div className="fn-price">${(totalPrice / 100) * 5}</div>
            </div>
            <div className="sidebar-btn" onClick={orderComplete}>
              <div>Make an order</div>
              <img
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
                src={arrow2}
                className="arrow-backk"
                alt="назад"
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="cartempty">
          <img src={isOrderComplete ? list : box} alt="box" />
          <h2>{isOrderComplete ? "Your order is ready!" : "Cart is empty"}</h2>
          <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
            {isOrderComplete
              ? `Your order #${orderId} was submitted and will be`
              : "Add at least one pair of"}
          </h5>
          <h5 style={{ color: "gray", fontWeight: "100" }}>
            {isOrderComplete
              ? "shipped to you as soon as possible"
              : "sneakers to make an order."}
          </h5>
          <Button />
        </div>
      )}
    </div>
  );
};

export default SideBar;
