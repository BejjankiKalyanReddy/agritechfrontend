import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AgriContext } from "../context/AgriContext";
import "./Order.css";
import LoadingScreen from "./LoadingScreen";

const apiUrl = import.meta.env.VITE_API_URL;

const Order = () => {
  const { user, products, loadingProducts } = useContext(AgriContext);
  const [orders, setorders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const data = await axios.get(`${apiUrl}orders/bycustid/${user.id}`);
        setorders(data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  if (loadingProducts || loadingOrders || !user?.id) {
    return <LoadingScreen message="Loading your orders..." />;
  }

  return (
    <div className="order">
      <h3 className="order-title">Your Orders</h3>
      {orders.length === 0
        ? (
            <div className="loading-screen">
              <div className="loading-container">
                <h3 className="loading-text">No orders found</h3>
                <p style={{ color: 'var(--text-medium)', marginTop: '10px' }}>
                  Start shopping to see your orders here!
                </p>
              </div>
            </div>
          )
        : orders.map((item) => {
            const orderproduct = products.find(
              (item2) => item.product_id === item2.id
            );

            if (!orderproduct) {
              console.warn("Item not found");
              return null;
            }

            const date = new Date(item.created_at);

            const formattedDate = date.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "numeric",
              // hour: "2-digit",
              // minute: "2-digit",
              // second: "2-digit",
              // hour12: true,
            }); // Output: "14 December 2024, 5:22:32 PM"

            return (
              <div key={item.record_id} className="card">
                <img
                  className="card-img"
                  // src={orderproduct.image}x
                  src="/Pecticide.jpg"
                  alt="Product"
                />
                <div className="card-content">
                  <h3 className="card-title">{orderproduct.name}</h3>
                  <h4 className="card-subtitle">{orderproduct.category}</h4>
                  <p className="card-desc">{item.status}</p>
                  <p className="card-desc">{formattedDate}</p>
                  <div className="card-footer">
                    <h4 className="card-price">Price: ₹{orderproduct.price}</h4>
                    <h4>QTY: {item.quantity}</h4>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Order;
