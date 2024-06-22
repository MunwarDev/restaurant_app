import React, { createContext, useContext, useState, useEffect } from 'react';

const BillContext = createContext();

export const useBill = () => {
  return useContext(BillContext);
};

export const BillProvider = ({ children }) => {
  const [billItems, setBillItems] = useState(() => {
    const savedItems = localStorage.getItem('billItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('billItems', JSON.stringify(billItems));
  }, [billItems]);

  const addToBill = (item) => {
    const existingItem = billItems.find(existingItem => existingItem.id === item.id);
    if (existingItem) {
      // Item already exists, increase its quantity
      setBillItems(prevItems =>
        prevItems.map(item =>
          item.id === existingItem.id ? { ...item, quantity: parseInt(item.quantity, 10) + 1, totalPrice: (parseInt(item.quantity, 10) + 1) * item.price } : item
        )
      );
    } else {
      // Item does not exist, add it to the bill
      setBillItems(prevItems => [...prevItems, { ...item, quantity: 1, totalPrice: item.price }]);
    }
  };

  const removeFromBill = (itemId) => {
    setBillItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const increaseQuantity = (itemId) => {
    setBillItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(item.quantity, 10) + 1, totalPrice: (parseInt(item.quantity, 10) + 1) * item.price } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setBillItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: parseInt(item.quantity, 10) - 1, totalPrice: (parseInt(item.quantity, 10) - 1) * item.price } : item
      )
    );
  };

  const getBillItemsCount = () => {
    return billItems.length;
  };

  return (
    <BillContext.Provider value={{ billItems, addToBill, removeFromBill, increaseQuantity, decreaseQuantity, getBillItemsCount }}>
      {children}
    </BillContext.Provider>
  );
};
