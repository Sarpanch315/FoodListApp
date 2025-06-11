import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white py-6  mt-10 bottom-0  w-full shadow-inner">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Upper Section - Copyright & Creator Info */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4 mb-4">
          <p className="text-sm text-gray-400 mb-2 md:mb-0">
            © {new Date().getFullYear()} Apna Food Store. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">Created by  <span className='text-2xl font-bold'>Govind Sikarwar</span> </p>
        </div>

        {/* Navigation Links Section */}
        <div className="flex justify-center space-x-4 text-sm text-gray-300">
          <NavLink
            to="/about"
            className="hover:text-white transition duration-300 ease-in-out"
          >
            About Us
          </NavLink>
          <NavLink
            to="#"
            className="hover:text-white transition duration-300 ease-in-out"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="#"
            className="hover:text-white transition duration-300 ease-in-out"
          >
            Terms & Conditions
          </NavLink>
          <NavLink
            to="#"
            className="hover:text-white transition duration-300 ease-in-out"
          >
            Contact
          </NavLink>
        </div>

        {/* Footer Note Section */}
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>
            Built with ❤️ and JavaScript. A seamless food ordering experience for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
