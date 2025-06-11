 import { configureStore } from '@reduxjs/toolkit';
 import authReducer from './authSlice';
 import restaurantSlice from './restaurantSlice'
 import restaurantMenuSlice from './restaurantMenuSlice'
import cartSlice  from './cartSlice';

 
 
 const store = configureStore({
   reducer: {
     auth: authReducer,
     restaurants : restaurantSlice,
     restaurantMenu : restaurantMenuSlice,
     cart : cartSlice,
   },
 });
 
 export default store;
