"use client";

import { useState } from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Title Section */}
          <div className="title bg-gray-100 p-10 rounded-lg mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to HRM</h1>
            <p className="text-lg text-gray-600 mb-4">
              Manage your human resources efficiently and effectively.
            </p>
          </div>

          {/* Subtitle Section */}
          <div className="subtitle bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What is HRM?</h2>
            <p className="text-md text-gray-500 mb-4">
              HRM is a human resource management system that helps organizations manage their employees and their data.
            </p>
          </div>
        </div>

        {/* Join Section */}
        <div className="join bg-blue-600 text-white p-6 rounded-lg mb-6 text-center justify-center flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Join today.</h2>
          <p className="text-lg mb-6">
            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/signup'}
              className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Create account
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-500 transition"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} HRM System. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
