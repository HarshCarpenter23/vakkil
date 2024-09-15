"use client"

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    console.log('Form submitted', formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'conic-gradient(from 180deg at 50% 50%, #507687 0deg, #16325B 264.93deg, #507687 360deg)',
      }}
    >
      <div
        className="w-96 p-8 rounded-xl shadow-md"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, #303F86 -89.38deg, #0B0F20 100.73deg, #303F86 270.62deg, #0B0F20 460.73deg)',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/sword_of_law.png" alt="Logo" className="h-20" />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">
          Create Your Account
        </h2>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full py-2 pl-10 pr-3 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full py-2 pl-10 pr-3 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full py-2 pl-10 pr-10 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
            {passwordVisible ? (
              <HiOutlineEyeOff
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <HiOutlineEye
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full py-2 pl-10 pr-10 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {confirmPasswordVisible ? (
              <HiOutlineEyeOff
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <HiOutlineEye
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
          </div>
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            SIGN UP
          </button>
          {/* Sign In Link */}
          <div className="text-center mt-4">
            <span className="text-gray-400">Have an account? </span>
            <a href="/signin" className="text-blue-400 hover:underline">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
