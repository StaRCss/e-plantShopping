import React , { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


  const CartItem = ({onContinue}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', ''));
      return total + (itemCost * item.quantity);
    }, 0).toFixed(2);  // Return total as a string with two decimal places
  };

  // Calculate total cost for each item
  const calculateTotalCost = (item) => {
    // Ensure the cost is in a proper format and can be parsed
    const itemCost = parseFloat(item.cost.replace('$', '')); 
    return (itemCost * item.quantity).toFixed(2);  // Return total for this item with two decimal places
  };

const handleContinueShopping = () => {
 onContinue();
  if (typeof onContinue === 'function') {
      onContinue();                                   // Test to see if function passed is passed as a prop
    } else {
      console.warn('onContinue is not a function!');
    }
};

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

  // Handle increment of quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrement of quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Handle item removal
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };


  return (
    <div className="cart-container">
    
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
    <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
  </div>  
    </div>
  );
};

export default CartItem;
