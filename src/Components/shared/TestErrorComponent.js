import React, { useState } from 'react';

/**
 * TestErrorComponent - A component to test Error Boundary functionality
 * This component is for development/testing purposes only
 * 
 * Usage: Import this component and add it to your app to test error handling
 */
const TestErrorComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Simulate an error
    throw new Error('This is a test error thrown by TestErrorComponent!');
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 shadow-lg">
      <p className="text-sm font-semibold text-yellow-800 mb-2">
        🧪 Error Boundary Test
      </p>
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default TestErrorComponent;
