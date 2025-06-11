import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { resetPassword } from "../Store/authSlice";

export default function PasswordChange () {
    const [email,setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleResetPassword  = () => {
        try {
           dispatch(resetPassword({email,oldPassword,newPassword}));
           alert('Password Changed successfully');
           navigate('/login');
        }
        catch(error) {
            alert(error.message);
        }
    };
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-extrabold text-green-950 mb-6 text-center">Reset Your Password</h2>
        
        <div className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {/* New Password Input */}
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          
          {/* Old Password Input */}
          <input
            type="password"
            placeholder="Old Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleResetPassword}
          className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transform transition duration-200"
        >
          Reset Password
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-500">
          Remembered your password?{' '}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
    );
}