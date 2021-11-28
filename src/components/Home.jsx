import React from "react";
import GridItem from "./GridItem";
import "./MainContainer.css";
import search from "../icons/search.svg";
import cross from "../icons/close.svg";
import AppContext from "../context";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const { wrapperItems } = React.useContext(AppContext);
  const { onAddToCart } = React.useContext(AppContext);
  const { onAddToFavourite } = React.useContext(AppContext);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    const letterNumber = searchValue.length;
    letterNumber < 10 ? setSearchValue(event.target.value) : setSearchValue("");
  };

  return (
    <div className="main-container">
      <div className="under-header-wrapper">
        <h1 className="title">
          {searchValue ? `Search by: "${searchValue}"` : "All sneakers"}
        </h1>
        <div className="searchwrapper">
          <img className="search" src={search} alt="search" />
          <input
            className="input"
            onChange={onChangeSearchInput}
            placeholder="Search..."
            value={searchValue}
            type="text"
          />
          {searchValue ? (
            <img
              className="cross"
              onClick={() => setSearchValue("")}
              src={cross}
              alt="cross"
            />
          ) : null}
        </div>
      </div>

      <div className="grid-wrapper">
        {wrapperItems
          .filter((ff) =>
            ff.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <GridItem
              {...item}
              key={index}
              onPlus={(obj) => onAddToCart(obj)}
              onFavourite={(obj) => onAddToFavourite(obj)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
