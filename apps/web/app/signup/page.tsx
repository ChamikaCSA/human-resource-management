"use client";

import { useState } from "react";
import { signUp } from "../../lib/auth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
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
      window.location.href = "/buzz";
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <h4 className="text-2xl font-bold mb-6 text-teal-900">Sign Up</h4>
      <Card className="mb-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardHeader className="bg-teal-500 text-white p-4">
          <h6 className="text-lg font-semibold">Create your account</h6>
        </CardHeader>
        <CardContent className="p-4">
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={(date) => setDob(date ?? undefined)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
            <div className="flex justify-end">
              <Button type="submit" variant="default" color="primary" className="bg-teal-500 hover:bg-teal-600 text-white">Next</Button>
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

export default SignUpPage;
