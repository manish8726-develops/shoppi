import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-lg"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
