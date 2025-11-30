import React, { useContext } from "react";
import Product from "./product/Product";
import { AgriContext } from "../../context/AgriContext";
import LoadingScreen from "../LoadingScreen";

const Pecticides = () => {
  const { products, loadingProducts } = useContext(AgriContext);
  
  if (loadingProducts) {
    return <LoadingScreen message="Loading pesticides..." />;
  }

  const pesticideProducts = products.filter((item) => item.category === "Pecticide");

  if (pesticideProducts.length === 0) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <h3 className="loading-text">No pesticides available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {pesticideProducts.map((item) => (
        <Product key={item.id || item._id} item={item} />
      ))}
    </div>
  );
};

export default Pecticides;
