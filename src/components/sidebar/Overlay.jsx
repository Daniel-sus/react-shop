import React, { useContext } from "react";
import AppContext from "../../context";
import "./SideBar.css";

const Overlay = () => {
  const { setCartOpened } = useContext(AppContext);
  return <div className="overlay" onClick={() => setCartOpened(false)}></div>;
};

export default Overlay;
