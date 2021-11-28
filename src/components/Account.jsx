import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";
import smile from "../icons/upsetsmile.svg";
import Button from "./Button";
import axios from "axios";
import GridItem from "./GridItem";
import backk from "../icons/back.svg";

const Account = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://613397247859e700176a3760.mockapi.io/orders"
      );
      setOrders(data.map((obj) => obj.cartItems).flat());
    })();
  }, []);

  const deleteOrderItems = async () => {
    try {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        await axios.delete(
          "https://613397247859e700176a3760.mockapi.io/orders/" + order.id
        );
        setOrders([]);
      }
    } catch (error) {}
  };

  return (
    <div className="main-container">
      {orders.length < 1 ? (
        <div className="no-account">
          <img src={smile} alt="смайл" />
          <h2>No orders yet</h2>
          <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
            You a rogue ?{" "}
          </h5>
          <h5 style={{ color: "gray", fontWeight: "100" }}>
            Make at least one order
          </h5>
          <Link
            to={process.env.PUBLIC_URL + "/"}
            style={{ textDecoration: "none" }}
          >
            <Button />
          </Link>
        </div>
      ) : (
        <div>
          <div className="backWrapper">
            <Link to={process.env.PUBLIC_URL + "/"}>
              <img src={backk} className="arrow-return" alt="назад" />
            </Link>
            <h1 className="titlee">My orders</h1>
            <div className="delete_orders" onClick={() => deleteOrderItems()}>
              Delete
            </div>
          </div>
          <div className="grid-wrapper">
            {orders.map((item, index) => (
              <GridItem
                item={item}
                id={item.id}
                key={index}
                price={item.price}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
