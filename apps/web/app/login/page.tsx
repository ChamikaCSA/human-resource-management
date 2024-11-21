"use client";

import { useState, useEffect } from "react";
import { signIn, isLoggedIn } from "../../lib/auth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = "/buzz";
    }
  }, []);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const { user, accessToken, refreshToken } = await signIn(email, password);
      window.location.href = "/buzz";
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <h4 className="text-2xl font-bold mb-6 text-teal-900">Sign In</h4>
      <Card className="mb-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardHeader className="bg-teal-500 text-white p-4">
          <h6 className="text-lg font-semibold">Log in to your account</h6>
        </CardHeader>
        <CardContent className="p-4">
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
            <div className="flex justify-end">
              <Button type="submit" variant="default" color="primary" className="bg-teal-500 hover:bg-teal-600 text-white">Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <footer className="mt-10 text-center text-teal-500">
        &copy; {new Date().getFullYear()} TealHRM. All rights reserved.
      </footer>
    </div>
  );
};

export default SignInPage;
