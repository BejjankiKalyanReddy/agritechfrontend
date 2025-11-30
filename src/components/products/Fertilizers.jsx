import React, { useContext } from "react";
import Product from "./product/Product";
import { AgriContext } from "../../context/AgriContext";
import LoadingScreen from "../LoadingScreen";

const Fertilizers = () => {
  const { products, loadingProducts } = useContext(AgriContext);
  
  if (loadingProducts) {
    return <LoadingScreen message="Loading fertilizers..." />;
  }

  const fertilizerProducts = products.filter((item) => item.category === "Fertilizer");

  if (fertilizerProducts.length === 0) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <h3 className="loading-text">No fertilizers available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {fertilizerProducts.map((item) => (
        <Product key={item.id || item._id} item={item} />
      ))}
    </div>
  );
};

export default Fertilizers;
