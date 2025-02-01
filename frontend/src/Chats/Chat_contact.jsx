import React from "react";
import Logo from "@/Logo";
import Title from "@/Title";
import ProfileInfo from "./ProfileInfo";
function Chat_contact() {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-center pr-10">
          <Title text="Direct Messages" />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-center pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

export default Chat_contact;
