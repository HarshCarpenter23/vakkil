"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/navigation'
import axios from 'axios';
import { Clock, Maximize2, ArrowRight, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import withAuth from '../components/withAuth';
import { getAuth } from 'firebase/auth'; // Import getAuth to get the current user

const LegalAssistantUI = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading
  const router = useRouter(); // Initialize the router using 'next/navigation'

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;

    try {
      // Add user message to chat history
      setChatHistory(prev => [...prev, { type: 'user', content: query }]);

      // Show loading indicator
      setLoading(true);

      // Get the Firebase ID token for the current user
      const auth = getAuth();
      const idToken = await auth.currentUser.getIdToken();

      // Make a POST request to the Next.js API route
      const res = await axios.post('/api/proxy', {
        instruction: query,
      });

      // Add assistant response to chat history
      setChatHistory(prev => [...prev, { type: 'assistant', content: res.data.response }]);

      // Store the conversation in the database
      await storeChatInDb(query, res.data.response, idToken);

      // Clear the input
      setQuery('');
    } catch (error) {
      console.error("Error fetching data:", error);
      setChatHistory(prev => [...prev, { type: 'error', content: 'An error occurred. Please try again.' }]);
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  // Function to store the chat in the database
  const storeChatInDb = async (userMessage, assistantResponse, idToken) => {
    try {
      // Sample payload to send to the backend
      const payload = {
        user_message: userMessage,
        assistant_response: assistantResponse,
      };

      // Send the token and payload to the backend
      const response = await axios.post('http://localhost:5000/api/store-chat', payload, {
        headers: {
          'Authorization': `Bearer ${idToken}`, // Send the token in the Authorization header
        },
      });

      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error storing chat in the database:', error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-around p-4 transition-colors duration-300 ${
      darkMode ? 'bg-gradient-to-br from-[#507687] via-[#16325B] to-[#507687]' : 'bg-gradient-to-br from-[#FFFFFF] via-[#E0E0E0] to-[#FFFFFF]'
    }`}>
      <button
        onClick={() => router.push('/team')}
        className="absolute top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Go to Team
      </button>
      <div className="relative w-full max-w-2xl">
        
        {/* Left sidebar */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 p-2 space-y-4">
          <button className="block p-2 hover:bg-blue-700 rounded">
            <Clock className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
          <button className="block p-2 hover:bg-blue-700 rounded">
            <Maximize2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
          <button onClick={toggleDarkMode} className="block p-2 hover:bg-blue-700 rounded">
            {darkMode ? <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </button>
        </div>

        {/* Main card */}
        <div className={`rounded-3xl p-8 shadow-lg transition-colors duration-300 ${
          darkMode ? 'bg-[#1F2A5C] bg-opacity-57 border border-[#1F2A5C]' : 'bg-white border border-gray-300'
        }`}>
          
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

          {/* Chat history */}
          <div className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-gray-100'} max-h-64 overflow-y-auto`}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${message.type === 'user' 
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-200 text-gray-800') 
                    : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800')
                }`}>
                  {message.type === 'assistant' ? (
                    <ReactMarkdown className="text-sm markdown-content">
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {/* Loading indicator */}
            {loading && (
              <div className="text-center text-gray-500 mt-4">
                <p>Loading...</p>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Enter Your Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit()}
              className={`w-full rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-100 text-gray-800 focus:ring-blue-500'
                  : 'bg-gray-200 text-gray-800 focus:ring-gray-500'
              }`}
            />
            <button
              onClick={handleQuerySubmit}
              disabled={loading} // Disable button while loading
              className={`cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition duration-300 ease-in-out ${
                darkMode 
                  ? (loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700') 
                  : (loading ? 'bg-gray-400' : 'bg-gray-500 hover:bg-gray-600')
              }`}
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Suggestion buttons */}
          <div className="space-y-4">
            {['What are my rights if I\'m stopped by the police?', 'How do I file for bankruptcy?', 'What is the process for getting a divorce?'].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(suggestion);
                  handleQuerySubmit();
                }}
                className={`w-full py-3 px-4 rounded-lg text-sm transition duration-300 ease-in-out ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAssistantUI;
