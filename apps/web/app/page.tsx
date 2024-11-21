"use client";

import { useState, useEffect } from "react";
import { isLoggedIn } from "../lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const HomePage = () => {
  useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = "/buzz";
    }
  }, []);

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <header className="text-center py-10 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-2xl mb-10">
        <h1 className="text-4xl font-bold">Welcome to TealHRM</h1>
        <p className="text-lg mt-4">Streamline your people management with ease.</p>
        <Button
          onClick={() => window.location.href = '/signup'}
          variant="default"
          color="primary"
          className="mt-6 bg-white text-teal-600 hover:bg-gray-200"
        >
          Get Started
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <h5 className="text-xl font-bold text-teal-900">About TealHRM</h5>
            </CardHeader>
            <CardContent>
              <p className="text-md text-teal-700">
                TealHRM is a comprehensive system designed to help organizations manage their workforce efficiently.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <h5 className="text-xl font-bold text-teal-900">Features</h5>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-teal-700">
                <li>Employee Management</li>
                <li>Attendance Tracking</li>
                <li>Payroll Processing</li>
                <li>Performance Reviews</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-gray-100 text-center justify-center flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <h5 className="text-xl font-bold text-teal-900">Join Us Today</h5>
          </CardHeader>
          <CardContent>
            <p className="text-md mb-6 text-teal-700">
              By joining, you agree to our Terms of Service and Privacy Policy, including our use of cookies.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => window.location.href = '/signup'}
                variant="default"
                color="primary"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white"
              >
                Create Account
              </Button>
              <div className="text-teal-700">Already have an account?</div>
              <Button
                onClick={() => window.location.href = '/login'}
                variant="default"
                color="secondary"
                className="w-full bg-gray-500 hover:bg-gray-600 text-white"
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-10 text-center text-teal-500">
        &copy; {new Date().getFullYear()} TealHRM. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
