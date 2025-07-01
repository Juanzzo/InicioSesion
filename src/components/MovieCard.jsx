import React, { useState } from 'react';
import { useCart } from '../features/cart/hooks/CartContext';
import Swal from 'sweetalert2';

const MovieCard = ({ movie }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const getPrice = (year) => {
    const currentYear = new Date().getFullYear();
    const movieYear = parseInt(year);
    if (isNaN(movieYear)) {
      return 1;
    }
    const age = currentYear - movieYear;
    let price = 30 - age;
    if (price < 1) {
      price = 1;
    }
    return price;
  };

  const price = getPrice(movie.Year);

  const handleAddToCart = () => {
    const item = {
      id: movie.imdbID,
      name: movie.Title,
      price: price,
      image: movie.Poster,
      quantity: quantity,
    };
    addToCart(item);
    Swal.fire({
      title: '¡Agregado!',
      text: `${movie.Title} ha sido agregado al carrito.`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <img src={movie.Poster} alt={movie.Title} style={{ width: '100%' }} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p>Precio: ${price}</p>
      <div>
        <button onClick={handleDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <button onClick={handleAddToCart}>Agregar al Carrito</button>
    </div>
  );
};

export default MovieCard;
