import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../Store/authSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Please fill Email ");
      return;
    }
    if (!name) {
      setNameError("Please fill Name");
      return;
    }
    if (!password) {
      setPasswordError("Please fill Password");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    dispatch(signup({ name, email, password }));

    setTimeout(() => {
      setMessage("");
      setEmail("");
      setName("");
      setPassword("");
      navigate("/login");
    }, 1000);
  };

  const handleChange = (setter, errorSetter) => (e) => {
    setter(e.target.value);
    if (e.target.value) {
      errorSetter("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-950 text-center mb-4">
          Create Your Account
        </h2>
        {message && (
          <p className="text-center text-green-500 mb-4 font-medium">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange(setName, setNameError)}
          />
          {nameError && (
            <p className="text-red-500 text-sm text-center">{nameError}</p>
          )}

          {/* Email Input */}
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail, setEmailError)}
          />
          {emailError && (
            <p className="text-red-500 text-sm text-center">{emailError}</p>
          )}

          {/* Password Input */}
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword, setPasswordError)}
          />
          {passwordError && (
            <p className="text-red-500 text-sm text-center">{passwordError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect Message */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:underline transition duration-200"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
