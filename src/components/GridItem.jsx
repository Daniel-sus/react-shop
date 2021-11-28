import React from "react";
import "./GridItem.css";
import add from "../icons/add-btn.svg";
import add2 from "../icons/add-btn2.svg";
import checked from "../icons/checked.svg";
import checked2 from "../icons/checked2.svg";
import emptylike from "../icons/like.svg";
import like from "../icons/favourite.svg";
import like2 from "../icons/favourite2.svg";
import emptylike2 from "../icons/like2.svg";
import AppContext from "../context";

const GridItem = ({
  title,
  price,
  imageUrl,
  id,
  onPlus,
  onFavourite,
  favorited = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const { isItemLiked } = React.useContext(AppContext);
  const cartItemObj = { id, parentId: id, title, imageUrl, price };
  const obj = {
    id,
    parentId: id,
    title,
    imageUrl,
    price,
  };
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus(cartItemObj);
  };

  const onAddLike = () => {
    onFavourite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="grid-item">
      <div className="paddingwrapper">
        {onFavourite && (
          <img
            className="emptylike"
            onClick={onAddLike}
            src={isFavorite ? like : isItemLiked(id) ? like : emptylike}
            alt="like"
          />
        )}

        {onFavourite && (
          <img
            className="emptylike2"
            onClick={onAddLike}
            src={isFavorite ? like2 : isItemLiked(id) ? like2 : emptylike2}
            alt="like2"
          />
        )}

        <img className="sneakers-image" src={imageUrl} alt="sneakers" />
        <div className="item-title">{title}</div>
        <div className="under-image-wrapper">
          <div className="price-wrapper">
            <p className="item-text">PRICE</p>
            <h4 className="price">${price}</h4>
          </div>
          {onPlus && (
            <img
              className="add-btn"
              onClick={onClickPlus}
              alt="add button"
              src={isItemAdded(id) ? checked : add}
            />
          )}
          {onPlus && (
            <img
              className="add-btn2"
              onClick={onClickPlus}
              alt="add button"
              src={isItemAdded(id) ? checked2 : add2}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GridItem;
