import React, { useState } from "react";
import vectory from "../assets/victory.svg";
import login from "../assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log("error is occur in register");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error in login ");
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-gray-100">
      <div className="h-[90vh] w-[95vw] md:w-[80vw] xl:w-[70vw] rounded-3xl bg-white border-2 border-white shadow-2xl flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center w-full p-6 md:w-1/2 md:p-10">
          {/* Header Section */}
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img
                src={vectory}
                alt="vectory emoji"
                className="h-[50px] md:h-[80px]"
              />
            </div>
            <p className="mt-2 font-medium text-gray-600">
              Fill in the details to get started with the best chat app now.
            </p>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="signup" className="w-full">
            {/* Tab List */}
            <TabsList className="flex justify-center mb-6 space-x-12 bg-transparent rounded-none">
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
              <form onSubmit={loginHandler}>
                <div className="flex flex-col items-center space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-3 rounded-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-6 py-3 rounded-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="w-full py-3 text-white bg-purple-600 rounded-full"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Signup Tab Content */}
            <TabsContent
              value="signup"
              className="data-[state=active]:block hidden transition-all duration-300"
            >
              <form onSubmit={submitHandler}>
                <div className="flex flex-col items-center space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-3 rounded-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-6 py-3 rounded-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full px-6 py-3 rounded-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="w-full py-3 text-white bg-purple-600 rounded-full "
                  >
                    Signup
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Section (Image) */}
        <div className="items-center justify-center hidden w-1/2 h-full md:flex">
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
