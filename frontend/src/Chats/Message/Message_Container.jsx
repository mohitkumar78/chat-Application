import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Message_Container() {
  const { user } = useSelector((store) => store.auth); // Get logged-in user
  const { selectedChatMessage, selectedChatData } = useSelector(
    (store) => store.contact
  );

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const prevMessagesRef = useRef([]);

  // Update messages when selectedChatMessage changes
  useEffect(() => {
    if (
      JSON.stringify(prevMessagesRef.current) !==
      JSON.stringify(selectedChatMessage)
    ) {
      console.log("New messages received:", selectedChatMessage);
      setMessages([...selectedChatMessage]);
      prevMessagesRef.current = [...selectedChatMessage];
    }
  }, [selectedChatMessage]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderMessage = () => {
    if (!Array.isArray(messages) || messages.length === 0) {
      return <div className="text-center text-gray-500">No messages yet.</div>;
    }

    let lastDate = null;
    return messages.map((message, index) => {
      console.log("Rendering message:", message);
      if (!message?.content) return null;

      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index} className="fade-in">
          {showDate && (
            <div className="my-2 text-center text-gray-500">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {renderDmMessage(message)}
        </div>
      );
    });
  };

  const renderDmMessage = (message) => {
    const isSender = message.sender === user?._id; // ✅ Correct sender check

    return (
      <div
        className={`flex my-2 ${isSender ? "justify-start" : "justify-end"}`}
      >
        <div
          className={`p-3 rounded-lg max-w-[60%] break-words shadow-md transition-all transform scale-95 hover:scale-100 ${
            isSender
              ? "bg-[#8417ff] text-white border border-[#6b11cc] self-start" // Left for sender
              : "bg-[#2a2b33] text-white border border-[#ffffff]/20 self-end" // Right for receiver
          }`}
        >
          {message?.content}
          <div className="mt-1 text-xs text-gray-400">
            {moment(message?.timestamp).format("LT")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full p-4 px-8 overflow-y-auto">
      {renderMessage()}
      <div ref={scrollRef}></div>
    </div>
  );
}

export default Message_Container;
