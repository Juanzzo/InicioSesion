import React, { useState } from "react";

const MovieCard = ({ movie }) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "0.5rem" }}>
        <button onClick={handleDecrease} style={{ fontSize: "1.2rem", padding: "0 0.5rem" }}>−</button>
        <span style={{ margin: "0 1rem", fontSize: "1.2rem" }}>{quantity}</span>
        <button onClick={handleIncrease} style={{ fontSize: "1.2rem", padding: "0 0.5rem" }}>+</button>
      </div>
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
