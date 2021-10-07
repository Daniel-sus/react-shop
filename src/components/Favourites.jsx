import React from "react";
import { Link } from "react-router-dom";
import GridItem from "./GridItem";
import back from "../icons/back.svg";
import "./Favourites.css";
import smile from "../icons/smile.svg";
import arrow from "../icons/arrow-btn.svg";
import AppContext from "../context";

const Favourites = ({ onPlus, onFavourite }) => {
  const { favouriteItems } = React.useContext(AppContext);
  console.log(favouriteItems);
  return (
    <div className="main-container">
      {favouriteItems.length > 0 ? (
        <div>
          <div className="backWrapper">
            <Link to="/">
              <img src={back} className="arrow-back" alt="назад" />
            </Link>
            <h1 className="titlee">Мои закладки</h1>
          </div>
          <div className="grid-wrapper">
            {favouriteItems.map((item) => (
              <GridItem
                item={item}
                id={item.id}
                key={item.id}
                onPlus={onPlus}
                onFavourite={onFavourite}
                imageUrl={item.imageUrl}
                favourited={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-favourites">
          <img src={smile} alt="смайл" />
          <h2>Закладок нет :( </h2>
          <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
            Вы ничего не добавили в закладки
          </h5>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="no-favourites-btn ">
              <img src={arrow} className="arrow-back" alt="назад" /> Вернуться
              назад
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;
