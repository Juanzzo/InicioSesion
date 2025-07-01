import React from 'react';
import { useCart } from '../hooks/CartContext';
import './Cart.css';

const Cart = () => {
    const { items, isOpen, toggleCart, removeFromCart, updateQuantity, clearCart, total } = useCart();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="cart-overlay">
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Carrito de Compras</h2>
                    <button onClick={toggleCart} className="close-button">×</button>
                </div>
                <div className="cart-body">
                    {items.length === 0 ? (
                        <p>El carrito está vacío.</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <p>{item.name}</p>
                                    <p>Precio: ${item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="remove-button">Eliminar</button>
                            </div>
                        ))
                    )}
                </div>
                <div className="cart-footer">
                    <h3>Total: ${total}</h3>
                    <button onClick={clearCart} className="clear-button">Vaciar Carrito</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;