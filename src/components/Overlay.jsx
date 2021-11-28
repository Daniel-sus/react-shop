import React from "react";
import "./SideBar.css";

const Overlay = ({ onClose }) => {
  return <div className="overlay" onClick={onClose}></div>;
};

export default Overlay;
