import React from "react";
import "./Overlay.css";

const Overlay = (props) => {
  return <div className="overlayy" onClick={props.onClickOverlay}></div>;
};

export default Overlay;
