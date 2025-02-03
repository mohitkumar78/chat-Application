import React from "react";
import { useDispatch } from "react-redux";
import { RiCloseFill } from "react-icons/ri";
import { closeChat } from "@/Store/contact-slice";
function ChatHeader() {
  const dispatch = useDispatch();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center px-20">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center gap-3"></div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="transition-all duration-300 text-neutral-500 focus:border-none focus:outline-none focus:text-white"
            onClick={() => {
              dispatch(closeChat());
            }}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
