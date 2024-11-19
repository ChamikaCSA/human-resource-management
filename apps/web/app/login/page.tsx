"use client";

import { useState } from "react";
import { signIn } from "../../lib/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const { user, accessToken, refreshToken } = await signIn(email, password);
      window.location.href = "/newsfeed";
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Log in to your account
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} HRM System. All rights reserved.
      </footer>
    </div>
  );
};

export default SignInPage;
