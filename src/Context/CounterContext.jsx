import React, { createContext, useState } from 'react';

export const counterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  return (
    <counterContext.Provider value={{ numberOfCartItems, setNumberOfCartItems , wishlistItems, setWishlistItems }}>
      {children}
    </counterContext.Provider>
  );
}
