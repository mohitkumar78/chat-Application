import React from "react";
import Messagebar from "./Message/Messagebar";
import Message_Container from "./Message/Message_Container";
import ChatHeader from "./ChatHeader";
function Chat_Container() {
  return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
      <ChatHeader />
      <Message_Container />
      <Messagebar />
    </div>
  );
}

export default Chat_Container;
