import React from "react";
import GridItem from "./GridItem";
import "./MainContainer.css";
import search from "../icons/search.svg";

const Home = ({
  wrapperItems,
  cartItems,
  favouriteItems,
  onPlus,
  onFavourite,
}) => {
  console.log(wrapperItems);
  return (
    <div className="main-container">
      <div className="under-header-wrapper">
        <h1 className="title">All sneakers</h1>
        <div className="searchwrapper">
          <img className="search" src={search} alt="search" />
          <input className="input" placeholder="Поиск..." type="text" />
        </div>
      </div>

      <div className="grid-wrapper">
        {wrapperItems.map((item) => (
          <GridItem
            item={item}
            id={item.id}
            key={item.id}
            price={item.price}
            title={item.title}
            onPlus={onPlus}
            onFavourite={onFavourite}
            added={cartItems.some((f) => Number(f.id) == Number(item.id))}
            favourited={favouriteItems.some(
              (obj) => Number(obj.id) == Number(item.id)
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
