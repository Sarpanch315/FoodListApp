import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Store/cartSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 useEffect( () => {
  dispatch(clearCart());
 })

  const handleclick = () => {
      navigate('/home')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="flex justify-center">
          <div className="bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your transaction was completed
          successfully.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleclick}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
