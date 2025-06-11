import { useState } from "react";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // Tracks the step in the process
  const [email, setEmail] = useState(""); // User email
  const [otp, setOtp] = useState(""); // OTP entered by the user
  const [generatedOtp, setGeneratedOtp] = useState(null); // Generated OTP
  const [newPassword, setNewPassword] = useState(""); // New password

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Helper function to generate a 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  // Handle sending OTP via EmailJS
  const handleSendOtp = () => {
    if (!user) {
      return <h1>Your email is not registered</h1>;
    } else {
      const otpCode = generateOtp(); // Generate OTP
      setGeneratedOtp(otpCode); // Save the generated OTP locally

      // Send email using EmailJS
      emailjs
        .send(
          "service_rliima8", // Your EmailJS service ID
          "template_5shkj8f", // Your EmailJS template ID
          {
            email, // Dynamic email passed to the template
            otp: otpCode, // Dynamic OTP passed to the template
          },
          "IXYXDHbdvM9HfyuCJ" // Your EmailJS public key
        )
        .then(() => {
          alert(`OTP sent to ${email}`); // Notify user
          setStep(2); // Move to the next step
        })
        .catch((err) => {
          console.error("Failed to send OTP:", err);
          alert("Failed to send OTP. Please try again.");
        });
    }
  };

  // Verify the OTP entered by the user
  const handleVerifyOtp = () => {
    if (otp === String(generatedOtp)) {
      alert("OTP verified successfully!");
      setStep(3); // Proceed to the reset password step
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle resetting the password
  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    dispatch(forgetPassword({ email, newPassword }));
    alert("Password reset successfully!");
    setStep(1); // Restart the process
    setEmail(""); // Reset email field
    setOtp(""); // Reset OTP field
    setNewPassword(""); // Reset password field
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Forget Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Enter OTP
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Reset Password
            </h2>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
