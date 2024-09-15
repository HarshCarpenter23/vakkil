"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
    // Here you would handle the sign-in logic, e.g., authenticate with an API
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
          <Image
            className="h-20"
            src="/sword_of_law.png" alt="logo" 
            width={80}
            height={80}
          />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">
          Sign In to Your Account
        </h2>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            SIGN IN
          </button>
          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-gray-400">Don't have an account? </span>
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
