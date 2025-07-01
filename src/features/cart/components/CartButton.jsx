import React from 'react';
import { useCart } from '../hooks/CartContext';
import './CartButton.css';

const CartButton = () => {
    const { toggleCart, itemCount } = useCart();

    return (
        <button onClick={toggleCart} className="cart-button">
            🛒
            {itemCount > 0 && <span className="item-count">{itemCount}</span>}
        </button>
    );
};

export default CartButton;