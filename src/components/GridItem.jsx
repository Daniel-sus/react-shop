import React, { useState } from "react";
import "./GridItem.css";
import add from "../icons/add-btn.svg";
import add2 from "../icons/add-btn2.svg";
import checked from "../icons/checked.svg";
import checked2 from "../icons/checked2.svg";
import emptylike from "../icons/like.svg";
import like from "../icons/favourite.svg";
import like2 from "../icons/favourite2.svg";
import emptylike2 from "../icons/like2.svg";
import App from "../App";
import AppContext from "../context";

const GridItem = ({ favourited = false, item, onPlus, onFavourite }) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);

  const onClickPlus = () => {
    onPlus(item);
  };

  const onAddLike = () => {
    onFavourite(item);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="grid-item">
      <div className="paddingwrapper">
        <img
          className="emptylike"
          onClick={onAddLike}
          src={isFavourite ? like : emptylike}
          alt="like"
        />
        <img
          className="emptylike2"
          onClick={onAddLike}
          src={isFavourite ? like2 : emptylike2}
          alt="like2"
        />
        <img className="sneakers-image" src={item.imageUrl} alt="sneakers" />
        <div className="item-title">{item.title}</div>
        <div className="under-image-wrapper">
          <div className="price-wrapper">
            <p className="item-text">PRICE</p>
            <h4 className="price">${item.price}</h4>
          </div>
          <img
            className="add-btn"
            onClick={onClickPlus}
            alt="add button"
            src={isItemAdded(item.id) ? checked : add}
          />
          <img
            className="add-btn2"
            onClick={onClickPlus}
            alt="add button"
            src={isItemAdded(item.id) ? checked2 : add2}
          />
        </div>
      </div>
    </div>
  );
};

export default GridItem;
