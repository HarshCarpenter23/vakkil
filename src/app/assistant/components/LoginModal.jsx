// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 bg-black bg-opacity-50`}>
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;