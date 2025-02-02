import React from "react";
import Logo from "@/Logo";
import Title from "@/Title";
import ProfileInfo from "./ProfileInfo";
import NewDm from "./NewDm";

function Chat_contact() {
  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#2f303b] h-screen flex flex-col">
      {/* Logo Section */}
      <div className="px-4 pt-4">
        <Logo />
      </div>

      {/* Direct Messages Section */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
      </div>

      {/* Channels Section */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-start">
          <Title text="Channels" />
        </div>
      </div>

      {/* Profile Info at Bottom */}
      <div className="mt-auto">
        <ProfileInfo />
      </div>
    </div>
  );
}

export default Chat_contact;
