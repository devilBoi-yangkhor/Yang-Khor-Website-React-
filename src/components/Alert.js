// components/Alert.js
import React from 'react';

const Alert = ({ message, onClose, type }) => {
    // Define alert styles based on the type
    const alertStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
    };

    return (
        <div className={`p-4 rounded ${alertStyles[type] || alertStyles.success}`}>
            {message}
            <button onClick={onClose} className="ml-4">
                &times;
            </button>
        </div>
    );
};

export default Alert;
