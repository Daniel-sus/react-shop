import React from "react";
import "./SideBar.css";
import close from "../icons/close.svg";
import CartItem from "./CartItem";
import box from "../icons/box.svg";
import list from "../icons/list.svg";
import arrow from "../icons/arrow-btn.svg";
import arrow2 from "../icons/arrow.svg";
import "./Account.css";
import AppContext from "../context";

const SideBar = ({ onClose, items = [], deleteItem }) => {
  const { setCartOpened } = React.useContext(AppContext);
  const { setCartItems } = React.useContext(AppContext);
  const closeCart = () => {
    setCartOpened(false);
  };

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const orderComplete = () => {
    setCartItems([]);
    setIsOrderComplete(true);
  };

  return (
    <div className="sidebar">
      <div className="close-wrapper">
        <h2>Корзина</h2>
        <img onClick={onClose} src={close} alt="close" />
      </div>

      {items.length > 0 ? (
        <div className="cartitemsdiv">
          <div className="items">
            {items.map((item) => (
              <CartItem
                item={item}
                deleteItem={deleteItem}
                price={item.price}
                title={item.title}
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
          <div className="final-wrapper">
            <div className="final-price">
              <span className="fn-text">Итого:</span>
              <span className="fn-empty"></span>
              <span className="fn-price"> руб. </span>
            </div>
            <div className="final-taxes">
              <span className="fn-text">Налог 5%: </span>
              <span className="fn-empty"></span>
              <span className="fn-price">1074 руб. </span>
            </div>
            <div className="sidebar-btn" onClick={orderComplete}>
              <div>Оформить заказ</div>
              <img
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
                src={arrow2}
                className="arrow-back"
                alt="назад"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="cartempty">
          <img src={isOrderComplete ? list : box} alt="box" />
          <h2>{isOrderComplete ? "Ваш заказ готов!" : "Корзина пустая"}</h2>
          <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
            {isOrderComplete
              ? "Ваш заказ #1 скоро будет передан "
              : "Добавьте хотя бы одну пару"}
          </h5>
          <h5 style={{ color: "gray", fontWeight: "100" }}>
            {isOrderComplete
              ? "курьерской доставке"
              : "кроссовок, чтобы сделать заказ."}
          </h5>
          <div className="no-account-btn" onClick={closeCart}>
            <img src={arrow} className="arrow-back" alt="назад" />
            <div>Вернуться назад</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
