"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  originalPrice?: number;
  format: string;
  exam: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCart = localStorage.getItem("examvault_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("examvault_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart, isMounted]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Since these are digital downloads, we only want one copy of each item
      const exists = prevCart.some((cartItem) => cartItem.id === item.id);
      if (exists) {
        // Just return the same cart
        return prevCart;
      }
      return [...prevCart, item];
    });
    // Open the drawer automatically when an item is added
    setCartOpen(true);
  };

  const removeFromCart = (id: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
