import React, { useState } from "react";
import vectory from "../assets/victory.svg";
import login from "../assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-gray-100">
      <div className="h-[90vh] w-[95vw] md:w-[80vw] xl:w-[70vw] rounded-3xl bg-white border-2 border-white shadow-2xl flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 md:p-10">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img
                src={vectory}
                alt="vectory emoji"
                className="h-[50px] md:h-[80px]"
              />
            </div>
            <p className="font-medium text-gray-600 mt-2">
              Fill in the details to get started with the best chat app now.
            </p>
          </div>

          {/* Tabs Section */}
          <Tabs className="w-full">
            {/* Tab List */}
            <TabsList className="flex justify-center bg-transparent rounded-none mb-6 space-x-12">
              <TabsTrigger
                value="login"
                className="px-6 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-semibold border-b-2 border-transparent data-[state=active]:border-purple-600"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="px-6 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-semibold border-b-2 border-transparent data-[state=active]:border-purple-600"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* Login Tab Content */}
            <TabsContent
              value="login"
              className="data-[state=active]:block hidden transition-all duration-300"
            >
              <div className="flex flex-col space-y-4 items-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full px-6 py-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-full px-6 py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full bg-purple-600 text-white py-3 rounded-full">
                  Login
                </Button>
              </div>
            </TabsContent>

            {/* Signup Tab Content */}
            <TabsContent
              value="signup"
              className="data-[state=active]:block hidden transition-all duration-300"
            >
              <div className="flex flex-col space-y-4 items-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full px-6 py-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-full px-6 py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full rounded-full px-6 py-3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="w-full bg-purple-600 text-white py-3 rounded-full">
                  Signup
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Section (Image) */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center">
          <img
            src={login}
            alt="Login Illustration"
            className="h-[60%] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
