import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/cart');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="flex justify-center">
          <div className="bg-red-500 text-white w-16 h-16 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.366-1.477 2.477-1.477 2.843 0l.94 3.797a1 1 0 00.95.692h3.992c1.6 0 2.272 2.064 1.03 3.03l-3.23 2.471a1 1 0 00-.364 1.118l1.004 3.83c.367 1.477-1.214 2.708-2.465 1.742L10 14.347l-3.657 2.74c-1.252.966-2.832-.265-2.465-1.742l1.004-3.83a1 1 0 00-.364-1.118L1.288 8.619c-1.242-.966-.57-3.03 1.03-3.03h3.993a1 1 0 00.95-.692l.94-3.798z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment was not completed. Please try again or contact support.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleCancel}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
