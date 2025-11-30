import React, { useContext } from "react";
import Product from "./product/Product";
import "./products.css";
import { AgriContext } from "../../context/AgriContext";
import LoadingScreen from "../LoadingScreen";

const Products = () => {
  const { products, loadingProducts } = useContext(AgriContext);

  if (loadingProducts) {
    return <LoadingScreen message="Loading products..." />;
  }

  if (products.length === 0) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <h3 className="loading-text">No products available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {products.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Products;
