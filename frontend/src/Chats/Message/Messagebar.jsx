import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useSocket } from "../../Context/ScoketContext";

function Messagebar() {
  const { selectedChatData } = useSelector((store) => store.contact);
  const { user } = useSelector((store) => store.auth);
  const socket = useSocket();
  const [message, setMessage] = useState("");

  const handleMessage = async () => {
    if (!message.trim()) return;
    if (!socket) return console.log("❌ Socket not connected");

    const messageData = {
      sender: user._id,
      content: message,
      recipient: selectedChatData._id,
      timestamp: new Date().toISOString(),
    };

    console.log("📩 Sending message:", messageData);
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  return (
    <div className="h-[12vh] flex justify-center items-center px-6">
      <div className="flex items-center w-full max-w-3xl gap-3 px-6 py-4 bg-gray-800 rounded-full">
        <input
          value={message}
          type="text"
          className="flex-1 text-lg text-white bg-transparent outline-none"
          placeholder="Type Your Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleMessage}
          className="p-3 bg-blue-500 rounded-full"
        >
          <IoSend className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
}

export default Messagebar;
