import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  steps: string[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, steps, onClose }) => (
  <div className="modal-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="modal-content bg-gray-800 text-white rounded-lg shadow-xl transform scale-100 transition-transform duration-300 max-w-lg w-full p-6">
      <h2 className="text-3xl font-bold text-red-400 mb-4 text-center">{title}</h2>
      <p className="text-md text-gray-300 mb-4 p-4 bg-red-600 bg-opacity-25 rounded-lg border border-red-500 shadow-inner">
        {message}
      </p>
      <div className="mb-4">
        <p className="text-lg text-blue-400 font-semibold mb-2">Suggested Steps:</p>
        <ul className="list-disc pl-6 text-gray-200 space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="text-sm">{step}</li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <button
          className="pixel-button py-2 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-transform duration-300 focus:ring focus:ring-green-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
