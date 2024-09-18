"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import GoogleButton from 'react-google-button';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import axios from 'axios'; // Import axios to make API calls

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Get the ID token
      const idToken = await auth.currentUser.getIdToken();

      // Send the token to the backend
      await sendTokenToBackend(idToken);

      router.push('/assistant');
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      await signInWithPopup(auth, googleProvider);
      
      // Get the ID token
      const idToken = await auth.currentUser.getIdToken();

      // Send the token to the backend
      await sendTokenToBackend(idToken);

      router.push('/assistant');
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    }
  };

  // Function to send the token to the backend
  const sendTokenToBackend = async (idToken) => {
    try {
      // Sample payload to send to the backend
      const payload = {
        user_message: 'Sample user message',
        assistant_response: 'Sample assistant response',
      };

      // Send the token and payload to the backend
      const response = await axios.post('http://localhost:5000/api/store-chat', payload, {
        headers: {
          'Authorization': `Bearer ${idToken}`, // Send the token in the Authorization header
        },
      });

      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending token to backend:', error);
      toast.error('Failed to send data to backend');
    }
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
        <form className="space-y-4" onSubmit={handleEmailSignIn}>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 pl-10 pr-3 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="w-full py-2 pl-10 pr-10 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            <span className="text-gray-400">Don&apos;t have an account? </span>
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </div>
          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <span className="text-gray-400 cursor-pointer hover:text-blue-400" onClick={() => router.push('/reset')}>
              Forgot Password?
            </span>
          </div>
        </form>
        {/* Google Sign In Button */}
        <div className="flex justify-center mt-6">
          <div>
            <h4 className="text-center mb-3 text-gray-300">OR</h4>
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
