import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart
const initialState = {
  items: [], // Array to hold items in the cart
  totalQuantity: 0, // Total quantity of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Reducer to handle adding an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity++;
        state.totalQuantity += 1;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
        state.totalQuantity += 1;
      }
    },

    // Reducer to handle incrementing quantity
    incrementItem: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
      }
    },

    // Reducer to handle decrementing quantity
    decrementItem: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },

    // Reducer to handle removing an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      const itemToRemove = state.items.find(item => item.name === itemName);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.items = state.items.filter(item => item.name !== itemName);
      }
    },
  },
});

// Exporting the action creators
export const { addItem, incrementItem, decrementItem, removeItem } = cartSlice.actions;

// Selector to get total quantity
export const selectTotalQuantity = state => state.cart.totalQuantity;

// Export the reducer to be used in the store
export default cartSlice.reducer;
