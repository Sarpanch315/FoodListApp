import { createSlice } from '@reduxjs/toolkit';

export const restaurantMenuSlice = createSlice({
  name: 'restaurantMenu',
  initialState: {
    restaurantMenu: {
      data: { cards: [] },
    },
  },
  reducers: {
    addMenu: (state, action) => {
      state.restaurantMenu.data.cards = action.payload;
    },
  },
});

export const { addMenu } = restaurantMenuSlice.actions;

export default restaurantMenuSlice.reducer;