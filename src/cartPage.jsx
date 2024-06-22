// Cart.js
import React from 'react';
import { useBill } from './BillContext';
import './app.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { billItems, removeFromBill, increaseQuantity, decreaseQuantity, getBillItemsCount } = useBill();

const navigate = useNavigate();

  const getTotalPrice = () => {
    let totalPrice = 0;
    billItems.forEach(item => {
      totalPrice += parseFloat(item.totalPrice);
    });
    return totalPrice;
  };

  const calculateGST = () => {
    const totalPrice = getTotalPrice();
    const gstAmount = totalPrice * 0.12; 
    return gstAmount.toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    removeFromBill(itemId);
  };

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  const totalPrice = (getTotalPrice() + parseFloat(calculateGST())).toFixed(2);

  const checkOut = () => {
navigate("/pay", { state: { totalPrice } });

  }

  return (
    <div id='cart_flex'>

      <div>
      <h2 id='prod'>Product Details</h2>
     
      {billItems.length > 0 ? (
        <table id='table_cart'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id='cart1'>
            {billItems.map((item, index) => (
              <tr key={index} id='cart'>
                <td><img src={item.img} alt={item.productName} /></td>
                <td><i>{item.details}</i></td>
                <td>
                  <button id='button_card' onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <i>Quantity: {item.quantity}</i>
                  <button id='button_delete' onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </td>
                <td><i>Price: {item.price}</i></td>
                <td><i>Total Price: {item.totalPrice}</i></td>
                <td><button id='button_delete' onClick={() => handleRemoveItem(item.id)}>Remove</button></td>
              </tr>
            ))}
              <tr>
                <td colSpan={5}><h6>Total Price:</h6></td>
                <td><strong>{getTotalPrice()}</strong></td>
              </tr>
          </tbody>
        </table>
      ) : (
        <p>No product data available.</p>
      )}
    </div>


    <div id='total'>
    <h3>Total Price: ₹{getTotalPrice()}</h3>
    <h6>Gst(tax - 12%): ₹{calculateGST()}</h6><br />
    <h4>Delivery Price : ₹{totalPrice}</h4>
    <sub><strong>Items: {getBillItemsCount()}</strong></sub><br /><br />
    <button id='button_card' onClick={checkOut}>Check Out</button>
    </div>

    </div>
  );
}

export default Cart;
