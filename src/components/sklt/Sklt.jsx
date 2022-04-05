import React from "react";
import "./sklt.css";

const Sklt = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-image"></div>
      <div className="skeleton-text1"></div>
      <div className="skeleton-text2"></div>
      <div className="skeleton-bottom-wrapper">
        <div className="skeleton-price"></div>
        <div className="skeleton-btn"></div>
      </div>
    </div>
  );
};

export default Sklt;
