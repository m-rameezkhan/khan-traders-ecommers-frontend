import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((p) => p._id === product._id);

            if (existing) {
                return prev.map((p) =>
                    p._id === product._id
                        ? { ...p, quantity: p.quantity + product.quantity }
                        : p
                );
            }

            return [...prev, product];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    };

    // Add this inside your CartProvider
    const updateQuantity = (id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity  }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
