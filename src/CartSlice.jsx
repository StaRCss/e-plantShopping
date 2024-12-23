import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart
const initialState = {
  items: [], // Array to hold items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to handle adding an item to the cart
    addItem: (state, action) => {
      // Destructure the payload to get name, image, and cost
      const { name, image, cost } = action.payload;

      // Check if the item already exists in the cart (based on the name)
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If the item exists, increment its quantity by 1
        existingItem.quantity++;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Optional: Reducer to handle removing an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // Optional: Reducer to handle updating the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Exporting the action creators (addItem, removeItem, updateQuantity)
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;





// Export the reducer to be used in the store
export default cartSlice.reducer;
