import React from 'react';

const ErrorFallback = ({ error, errorInfo, onReset }) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 text-center mb-6">
          We're sorry for the inconvenience. The application encountered an unexpected error.
        </p>

        {isDevelopment && error && (
          <div className="mb-6">
            <details className="bg-red-50 border border-red-200 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                Error Details (Development Mode)
              </summary>
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Error Message:</h3>
                  <pre className="bg-white p-3 rounded border border-red-200 text-sm overflow-x-auto text-red-700">
                    {error.toString()}
                  </pre>
                </div>
                {errorInfo && errorInfo.componentStack && (
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Component Stack:</h3>
                    <pre className="bg-white p-3 rounded border border-red-200 text-xs overflow-x-auto text-gray-700 max-h-64 overflow-y-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Go to Home
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            If this problem persists, please contact support or try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
