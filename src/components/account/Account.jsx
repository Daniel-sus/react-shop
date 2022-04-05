import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";
import smile from "../../icons/upsetsmile.svg";
import Button from "../button/Button";
import axios from "axios";
import GridItem from "../griditem/GridItem";
import backk from "../../icons/back.svg";

const Account = () => {
  const [orders, setOrders] = React.useState([]);
  const [orderId, setOrderId] = React.useState();

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://613397247859e700176a3760.mockapi.io/orders"
      );
      setOrderId(data);
      setOrders(data.map((obj) => obj.cartItems).flat());
    })();
  }, []);

  const deleteOrderItems = async () => {
    try {
      for (let i = 0; i < orderId.length; i++) {
        const orderDelete = orderId[i].id;
        await axios.delete(
          `https://613397247859e700176a3760.mockapi.io/orders/${orderDelete}`
        );
      }
      setOrders([]);
    } catch (error) {
      alert("Не получилось удалить товары");
    }
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
            <h1 className="titleee">My orders</h1>
            <div className="delete_orders" onClick={() => deleteOrderItems()}>
              Clear
            </div>
          </div>
          <div className="order-reciept-wrapper">
            {orderId.map((obj) => (
              <div className="reciept-card">
                <h2>{obj.id}. Order</h2>
                <div className="grid-order-wrapper">
                  {obj.cartItems.map((item) => (
                    <GridItem key={item.id} {...item} noheart={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
