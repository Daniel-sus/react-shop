import "./App.css";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import SideBar from "./components/sidebar/SideBar.jsx";
import React, { useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Favourites from "./components/favourites/Favourites.jsx";
import Account from "./components/account/Account.jsx";
import AppContext from "./context";
import BurgerSlider from "./components/burgerslider/BurgerSlider.jsx";
import Overlay from "./components/sidebar/Overlay.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [favouriteItems, setFavouriteItems] = useState([]);

  const [wrapperItems, setWrapperItems] = useState([]);

  const [counter, setCounter] = useState();

  const [cartOpened, setCartOpened] = useState(false);

  const [burgerOpened, setBurgerOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemLiked = (id) => {
    return favouriteItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  React.useEffect(() => {
    async function Preload() {
      setIsLoading(true);
      const serverItems = await axios.get(
        "https://613397247859e700176a3760.mockapi.io/items"
      );
      const serverCartItems = await axios.get(
        "https://613397247859e700176a3760.mockapi.io/cart"
      );

      const serverFavourites = await axios.get(
        "https://613397247859e700176a3760.mockapi.io/favourites"
      );

      setCartItems(serverCartItems.data);
      setFavouriteItems(serverFavourites.data);
      setWrapperItems(serverItems.data);
      setIsLoading(false);
    }
    Preload();
  }, []);

  React.useEffect(() => {
    setCounter(cartItems.length);
  }, [cartItems]);

  const onAddToFavourite = async (favouriteItemObj, favorited) => {
    console.log(favouriteItemObj, favorited);
    try {
      const favoriteItemFind = favouriteItems.find(
        (item) => Number(item.parentId) === Number(favouriteItemObj.id)
      );
      const favoriteItemInFavoroitesFind = favouriteItems.find(
        (item) => Number(item.id) === Number(favouriteItemObj.id)
      );
      if (favoriteItemInFavoroitesFind && favorited) {
        console.log("Deleted from favorites");
        await axios.delete(
          `https://613397247859e700176a3760.mockapi.io/favourites/${favouriteItemObj.id}`
        );
        setFavouriteItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(favouriteItemObj.id))
        );
      } else if (favoriteItemFind) {
        console.log("deleted from home");
        await axios.delete(
          `https://613397247859e700176a3760.mockapi.io/favourites/${favoriteItemFind.id}`
        );
        setFavouriteItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(favoriteItemFind.id))
        );
      } else {
        console.log("posted new item");
        const { data } = await axios.post(
          "https://613397247859e700176a3760.mockapi.io/favourites",
          favouriteItemObj
        );
        setFavouriteItems((prev) => [...prev, data]);
      }
    } catch (error) {}
  };

  const onAddToCart = async (cartItemObj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(cartItemObj.id)
      );
      if (findItem) {
        try {
          await axios.delete(
            `https://613397247859e700176a3760.mockapi.io/cart/${findItem.id}`
          );
          setCartItems((prev) =>
            prev.filter(
              (item) => Number(item.parentId) !== Number(cartItemObj.id)
            )
          );
        } catch (error) {
          alert("error deleting from cart");
        }
      } else {
        try {
          const { data } = await axios.post(
            "https://613397247859e700176a3760.mockapi.io/cart",
            cartItemObj
          );
          setCartItems((prev) => [...prev, data]);
        } catch (error) {
          alert("error adding item to cart");
        }
      }
    } catch (error) {
      alert("Error, try again");
    }
  };

  const deleteItem = (id) => {
    axios.delete(`https://613397247859e700176a3760.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  return (
    <AppContext.Provider
      value={{
        onAddToFavourite,
        wrapperItems,
        cartOpened,
        cartItems,
        favouriteItems,
        isItemAdded,
        isItemLiked,
        setCartOpened,
        setCartItems,
        setBurgerOpened,
        burgerOpened,
        onAddToCart,
        deleteItem,
        isLoading,
      }}
    >
      <div className="App">
        <div className="main_wrapper">
          {cartOpened ? <Overlay onClose={() => setCartOpened(false)} /> : null}
          {cartOpened ? (
            <SideBar
              deleteItem={(cartitem) => deleteItem(cartitem)}
              items={cartItems}
              onRemoveItem
              onClose={() => setCartOpened(false)}
            />
          ) : null}
          <Header onClickCart={() => setCartOpened(true)} counter={counter} />
          <BurgerSlider
            onClickCart={() => setCartOpened(!cartOpened)}
            onClose={() => setCartOpened(false)}
          />
          <Route path={process.env.PUBLIC_URL + "/favourites"}>
            <Favourites />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/"} exact>
            <Home />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/account"}>
            <Account />
          </Route>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
