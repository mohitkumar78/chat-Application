import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function Message_Container() {
  const { selectedChatMessage } = useSelector((store) => store.contact);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  return (
    <div className="w-full p-4">
      {selectedChatMessage.length === 0 ? (
        <div className="text-center text-gray-500">No messages yet.</div>
      ) : (
        selectedChatMessage.map((message, index) => (
          <div
            key={index}
            className={message.sender === "me" ? "text-right" : "text-left"}
          >
            <div className="inline-block p-3 text-white bg-gray-700 rounded">
              {message.content}
            </div>
            <div className="text-xs text-gray-400">
              {moment(message.timestamp).format("LT")}
            </div>
          </div>
        ))
      )}
      <div ref={scrollRef}></div>
    </div>
  );
}

export default Message_Container;
