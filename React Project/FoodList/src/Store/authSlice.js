import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user : JSON.parse(localStorage.getItem('user')) || null,
  toggle :null,
};

const authSlice = createSlice({
  name : 'auth',
  initialState,
  reducers : {
    signup(state,action) {
      const {name,email,password} = action.payload;
      const user = {name,email,password};
      localStorage.setItem('user',JSON.stringify(user));
      state.user = user;
    },
    login(state, action) {
      const {email,password} = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if(storedUser && storedUser.email === email && storedUser.password === password) {
        state.user = storedUser;
      }
      else {
        throw new Error('Invalid email or password');
      }
    },
    logout(state,action) {
      if(action.payload === "LogOut"){
        state.user = null;
        state.toggle = true;
      }
      
    },
    toggleLoginLogout: (state,action) => {
     
        state.toggle = action.payload;
      
       // Toggle state for Login/Logout
    },
    resetPassword(state,action) {
      const {email,oldPassword,newPassword} = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if(storedUser && storedUser.email === email && storedUser.password === oldPassword) {
        storedUser.password = newPassword;
        localStorage.setItem('user' , JSON.stringify(storedUser));
      }
      else {
        throw new Error('Invalid Email and Password');
      }
    },
    forgetPassword(state,action) {
      const {email,newPassword} = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if(storedUser && storedUser.email === email ) {
        storedUser.password = newPassword;
        localStorage.setItem('user' , JSON.stringify(storedUser));
      }
    },
  },
});

export const {signup,login, logout,toggleLoginLogout, resetPassword ,forgetPassword} = authSlice.actions;
export default authSlice.reducer;

