"use client";

import React, { useState } from 'react';
import { Clock, Maximize2, ArrowRight, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import Modal from './components/LoginModal';

const LegalAssistantUI = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
    <div
      className={`min-h-screen flex items-center justify-around p-4 transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-[#507687] via-[#16325B] to-[#507687]'
          : 'bg-gradient-to-br from-[#FFFFFF] via-[#E0E0E0] to-[#FFFFFF]'
      }`}
    >
      <div className="relative w-full max-w-2xl">
        {/* Left sidebar */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 p-2 space-y-4">
          <button className="block p-2 hover:bg-blue-700 rounded">
            <Clock className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
          <button className="block p-2 hover:bg-blue-700 rounded">
            <Maximize2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
          <button
            onClick={toggleDarkMode}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-white" />
            ) : (
              <Moon className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Main card */}
        <div
          className={`rounded-3xl p-8 shadow-lg transition-colors duration-300 ${
            darkMode
              ? 'bg-[#1F2A5C] bg-opacity-57 border border-[#1F2A5C]'
              : 'bg-white border border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center mb-8">
            <Image 
              src="/sword_of_law.png" 
              width={300}
              height={300}
              quality={100}
              alt="Justice Symbol"
              className="w-16 h-20 mb-4"
            />
            <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              How Can I Help You Today?
            </h1>
          </div>

          <div className="space-y-4 mb-8">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className={`w-full py-3 px-4 rounded-lg text-sm transition duration-300 ease-in-out ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                }`}
              >
                What are my rights if I'm stopped by the police?
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Enter Your Query"
              className={`w-full rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-100 text-gray-800 focus:ring-blue-500'
                  : 'bg-gray-200 text-gray-800 focus:ring-gray-500'
              }`}
            />
            <button
              onClick={handleModalOpen} // Attach the function here
              className={`cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition duration-300 ease-in-out ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* <Modal isOpen={showModal} onClose={handleModalClose}>
        <h2 className="text-lg font-bold mb-4">Modal Title</h2>
        <p className="mb-6">This is the content of your modal.</p>
        <button onClick={handleModalClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Close</button>
    </Modal> */}

    </>
  );
};

export default LegalAssistantUI;
