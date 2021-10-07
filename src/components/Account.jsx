import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";
import arrow from "../icons/arrow-btn.svg";
import smile from "../icons/upsetsmile.svg";

const Account = () => {
  return (
    // <div className="main-container">
    <div className="no-account">
      <img src={smile} alt="смайл" />
      <h2>У вас нет заказов</h2>
      <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
        Вы нищеброд ?{" "}
      </h5>
      <h5 style={{ color: "gray", fontWeight: "100" }}>
        Оформите хотя бы один заказ.
      </h5>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="no-account-btn ">
          <img src={arrow} className="arrow-back" alt="назад" /> Вернуться назад
        </div>
      </Link>
    </div>
    // </div>
  );
};

export default Account;
