"use client";

import { useState } from "react";
import { signUp } from "../../lib/auth";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!dob) {
      setError("Date of Birth is required");
      return;
    }

    try {
      const { user, accessToken, refreshToken } = await signUp(
        firstName,
        lastName,
        email,
        phone,
        dob,
        password
      );
      window.location.href = "/newsfeed";
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Create your account
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-semibold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
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
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-gray-700 font-semibold mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
              onChange={(e) =>
                setDob(e.target.value ? new Date(e.target.value) : null)
              }
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
            >
              Next
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

export default SignUpPage;
