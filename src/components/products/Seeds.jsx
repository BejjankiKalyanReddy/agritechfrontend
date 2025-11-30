import React, { useContext } from "react";
import Product from "./product/Product";
import { AgriContext } from "../../context/AgriContext";
import LoadingScreen from "../LoadingScreen";

const Seeds = () => {
  const { products, loadingProducts } = useContext(AgriContext);
  
  if (loadingProducts) {
    return <LoadingScreen message="Loading seeds..." />;
  }

  const seedProducts = products.filter((item) => item.category === "Seed");

  if (seedProducts.length === 0) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <h3 className="loading-text">No seeds available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {seedProducts.map((item) => (
        <Product key={item.id || item._id} item={item} />
      ))}
    </div>
  );
};

export default Seeds;
