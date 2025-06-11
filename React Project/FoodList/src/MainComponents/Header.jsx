import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CART } from '../Constant/constant';
import { useDispatch, useSelector } from 'react-redux';
import { logout, toggleLoginLogout } from '../Store/authSlice';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.auth.toggle);
  const user = useSelector((state) => state.auth.user);
  const item = useSelector((state) => state.cart.cartItems);
  let count = 0;
  for (let i of item) {
    if (i) {
      count++;
    }
  }
  useEffect(() => {
    if(!user) {
      dispatch(toggleLoginLogout(true));
    }
  })
  const handleLogOut = (text) => {
    dispatch(logout(text));
  }

  const handleToggle = (text) => {
    dispatch(toggleLoginLogout(text));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className=''>
      {/* Sticky Header with Shadow & Z-index */}
      <div className="fixed top-0 z-0 w-full flex justify-between items-center bg-white shadow-md border-b border-gray-200 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
        {/* Logo & Brand Section */}
        <div className="flex items-center space-x-4">
          <div className="hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
            <NavLink to="/">
              <img
                data-testid="logo"
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                src="/logo.png"
                alt="Logo"
              />
            </NavLink>
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 items-center">
              Apna <span className="text-green-500">Food</span> Store
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1 sm:mt-2 lg:text-base">
              &quot;Eat food, not just to fill your stomach, but to fuel your soul.&quot;
            </p>
          </div>
        </div>

        {/* Mobile Menu Hamburger Icon - ONLY on small devices */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-700 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 px-3 py-2"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Desktop Navigation - Always visible on medium and larger devices */}
        <div className="hidden md:flex md:space-x-6">
          <NavLink
            to="/home"
            className="text-lg hover:text-green-600 transition duration-300 ease-in-out"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg hover:text-green-600 transition duration-300 ease-in-out"
          >
            About
          </NavLink>
          <NavLink
            to="/cart"
            className="text-lg hover:text-green-600 transition duration-300 ease-in-out flex items-center"
          >
            <img alt="cart-img" src={CART} className="h-6 w-6 mr-2" loading="lazy" />
            Cart ({count})
          </NavLink>
          { toggle ? ( <p
              className="cursor-pointer hover:text-green-600 transition duration-300 ease-in-out px-2"
              onClick={(e) => handleToggle(e.target.innerText)}
            >
              <NavLink to="/login">
              Login
              </NavLink>
            </p>) :
          
           (  <p
              className="cursor-pointer hover:text-red-600 transition duration-300 ease-in-out px-2"
              onClick={(e) => handleLogOut(e.target.innerText)}
            >
              LogOut
            </p>)}
        </div>

        {/* Mobile Menu Animation - Responsive dropdown menu */}
        {mobileMenuOpen && (
          <div
            className={`fixed top-12 left-0 bg-white shadow-lg rounded-lg z-50 w-72 md:hidden transition-transform transform ${
              mobileMenuOpen ? "translate-x-96" : '-translate-y-1'
            }`}
          >
            <div className="text-gray-800 font-bold text-lg px-4 pt-2 border-b border-gray-200">Menu</div>
            <ul className="space-y-2 p-3 text-lg">
              <li className="border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition duration-300 ease-in-out px-4 py-2">
                <NavLink to="/home" className="block">
                  Home
                </NavLink>
              </li>
              <li className="border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition duration-300 ease-in-out px-4 py-2">
                <NavLink to="/about" className="block">
                  About
                </NavLink>
              </li>
              <NavLink to="/cart" className=" border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition duration-300 ease-in-out px-4 py-2 flex items-center">
              <li className="flex items-center">
                
                  <img
                    alt="cart-img"
                    src={CART}
                    className="h-6 w-6 mr-2"
                    loading="lazy"
                  />
                  Cart ({count})
                  </li>
                </NavLink>
              
              { toggle ? ( <p
              className="border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition duration-300 ease-in-out px-4 py-2 flex items-center"
              onClick={(e) => handleToggle(e.target.innerText)}
            >
              <NavLink to="/login">
              Login
              </NavLink>
            </p>) :
          
           ( <p
              className="border border-gray-300 rounded-md hover:bg-red-200 cursor-pointer transition duration-300 ease-in-out px-4 py-2 flex items-center"
              onClick={(e) => handleLogOut(e.target.innerText)}
            >
              LogOut
            </p>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
