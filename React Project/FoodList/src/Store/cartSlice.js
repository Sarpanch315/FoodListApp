import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cartItems');
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);

      // Persist the updated cart to localStorage
      saveCartToLocalStorage(state.cartItems);
    },
    deleteToCart: (state, action) => {
      const idToDelete = action.payload; // Get the ID from the action
      state.cartItems = state.cartItems.filter(item => item.id !== idToDelete);

      // Persist the updated cart to localStorage
      saveCartToLocalStorage(state.cartItems);
    },
    clearCart : (state) => {
      state.cartItems = [];
    }
  },
});

export const { addToCart, deleteToCart ,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
