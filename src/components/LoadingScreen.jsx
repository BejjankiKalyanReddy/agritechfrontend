import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ message = "Loading products..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-icon">
          <div className="spinner"></div>
          <div className="leaf leaf-1">🌾</div>
          <div className="leaf leaf-2">🌱</div>
          <div className="leaf leaf-3">💚</div>
        </div>
        <h3 className="loading-text">{message}</h3>
        <div className="loading-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

