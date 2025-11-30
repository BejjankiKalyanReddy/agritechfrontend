import React from "react";
import Products from "./components/products/Products";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Agritech Store</h1>
        <p>🌾 Premium agricultural products for your farming needs 🌾</p>
      </div>
      <Products />
    </div>
  );
};

export default Dashboard;
