import React from "react";
import { Link } from "react-router-dom";
import GridItem from "../griditem/GridItem";
import back from "../../icons/back.svg";
import "./Favourites.css";
import smile from "../../icons/smile.svg";
import AppContext from "../../context";
import Button from "../button/Button";

const Favourites = () => {
  const { onPlus, favouriteItems } = React.useContext(AppContext);

  return (
    <div className="main-container">
      {favouriteItems.length > 0 ? (
        <div>
          <div className="backWrapper">
            <Link to={process.env.PUBLIC_URL + "/"}>
              <img src={back} className="arrow-return" alt="назад" />
            </Link>
            <h1 className="titlee">My favourites</h1>
          </div>
          <div className="grid-wrapper">
            {favouriteItems.map((item, index) => (
              <GridItem
                id={item.id}
                serverId={item.parentId}
                key={index}
                onPlus={onPlus}
                price={item.price}
                title={item.title}
                imageUrl={item.imageUrl}
                favorited={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-favourites">
          <img src={smile} alt="смайл" />
          <h2>No favourites :( </h2>
          <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
            You haven't added anything to favourites yet
          </h5>
          <Link
            to={process.env.PUBLIC_URL + "/"}
            style={{ textDecoration: "none" }}
          >
            <Button />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;
