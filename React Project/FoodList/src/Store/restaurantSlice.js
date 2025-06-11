import { createSlice } from '@reduxjs/toolkit';

export const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: {
      data: { cards: [] },
    },
  },
  reducers: {
    addData: (state, action) => {
      state.restaurants.data.cards = action.payload;
    },
  },
});

export const { addData } = restaurantSlice.actions;

export default restaurantSlice.reducer;