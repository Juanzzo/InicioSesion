import React, { createContext, useContext, useReducer } from 'react';

const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART'
};

const initialState = {
    items: [],
    isOpen: false,
    total: 0,
    itemCount: 0
};

function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            let newItems;
            if (existingItem) {
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                        : item
                );
            } else {
                newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
            }
            const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }
        case CART_ACTIONS.REMOVE_ITEM: {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }
        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
            }
            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }
        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0
            };
        case CART_ACTIONS.TOGGLE_CART:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        default:
            return state;
    }
}

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    const toggleCart = () => {
        dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);