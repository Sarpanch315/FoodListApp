import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { login, toggleLoginLogout } from "../Store/authSlice";
import { addToCart } from "../Store/cartSlice";


export default function Login () {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [message,setMessage] = useState('')

  


    const handleSubmit =async(e) =>  {
        dispatch(toggleLoginLogout(false))
        e.preventDefault();
        setEmailError('')
        setPasswordError('')
       
        if (!email) {
            setEmailError('Please fill Email ');
            return;
          }

        if (!password) {
            setPasswordError('Please fill Password');
            return;}
        else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
          }
         try {
           dispatch(login({email,password}));
           setMessage('login Successful!');
           const savedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
           if (savedCart.length > 0) {
             savedCart.forEach((item) => dispatch(addToCart(item)));
             sessionStorage.removeItem('cart');
           }
           
           // window.alert("Login Successful");
           setTimeout(() => {
             setMessage(''); 
             setEmail('');
             setPassword('');
             setEmailError('')
             setPasswordError('')
             navigate('/')
            }, 1000);  
          }
         catch(error) {
          alert(error.message);
        }    
       
    }
    const EmailErrorChange = (e) => {
        setEmail(e.target.value);

        if(e.target.value){
            setEmailError('');
        }
    }
    const passwordErrorChange = (e) => {
        setPassword(e.target.value);

        if(e.target.value){
            setPasswordError('');
        }
    }
    return (
      <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="w-full max-w-md p-10 bg-white border shadow-lg rounded-lg transform transition-transform hover:scale-105">
        {/* Login Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-950 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Please log in to your account</p>
        </div>
    
        {/* Success/Message Text */}
        {message && (
          <p className="text-center text-green-500 mb-4 transition duration-300 ease-in-out">
            {message}
          </p>
        )}
    
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={EmailErrorChange}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
            />
            {emailError && (
              <p className="text-sm text-red-500 mt-1 text-center">{emailError}</p>
            )}
          </div>
    
          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={passwordErrorChange}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1 text-center">{passwordError}</p>
            )}
          </div>
    
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 duration-200 ease-in-out"
          >
            Log In
          </button>
        </form>
    
        {/* Forgot Password Section */}
        <div className="mt-4 text-center">
          <NavLink
            to="/forgetPassword"
            className="text-green-600 hover:text-green-800 font-medium transition duration-200 ease-in-out"
          >
            Forgot Password?
          </NavLink>
        </div>
    
        {/* Signup Section */}
        <div className="mt-2 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/signup"
              className="text-green-600 hover:text-green-800 font-medium transition duration-200 ease-in-out"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
    
    )
}