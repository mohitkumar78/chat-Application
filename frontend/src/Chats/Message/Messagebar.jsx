import React, { useState, useRef, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { useSocket } from "../../Context/ScoketContext";
import { Input } from "@/components/ui/input";
import axios from "axios";

function Messagebar() {
  const { selectedChatData } = useSelector((store) => store.contact);
  const { token } = useSelector((store) => store.auth);
  const fileref = useRef();
  const { user } = useSelector((store) => store.auth);
  const emojiRef = useRef();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);

  const handleMessage = async () => {
    if (!message.trim()) return;

    if (!socket || !socket.connected) {
      console.log("❌ Socket is not connected! Reconnecting...");
      socket.connect();
      return;
    }

    const messageData = {
      sender: user._id,
      content: message,
      recipient: selectedChatData._id,
      messageType: "text",
      fileUrl: undefined,
    };

    console.log("📩 Sending message:", messageData);
    socket.emit("sendMessage", messageData);
    setMessage("");
  };
  const handleFileAttacment = () => {
    if (fileref.current) {
      fileref.current.click();
    }
  };
  const handleAttacmentChange = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("token", token); // ✅ Add token to formData

        console.log("Sending token:", token); // Debugging

        const response = await axios.post(
          "http://localhost:4000/api/v1/message/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // ✅ Add token to headers
            },
          }
        );

        console.log("File uploaded successfully:", response.data);
      }
    } catch (error) {
      console.error("Error in file uploading", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[12vh] bg-[#1c1d25] flex justify-center items-center px-6 mb-6">
      <div className="relative w-full max-w-3xl flex bg-[#2a2b33] rounded-full items-center gap-3 px-6 py-4 shadow-lg border border-gray-600">
        <button
          className="transition-all duration-300 text-neutral-400 hover:text-white focus:outline-none"
          onClick={handleFileAttacment}
        >
          <GrAttachment className="text-2xl" />
        </button>
        <Input
          type="file"
          className="hidden"
          ref={fileref}
          onChange={handleAttacmentChange}
        />
        <input
          value={message}
          type="text"
          className="flex-1 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
          placeholder="Type Your Message..."
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="relative transition-all duration-300 text-neutral-400 hover:text-white focus:outline-none"
          onClick={() => setEmojiPicker((prev) => !prev)}
        >
          <RiEmojiStickerLine className="text-2xl" ref={fileref} />
        </button>

        {emojiPicker && (
          <div
            ref={emojiRef}
            className="absolute bottom-[60px] right-14 z-50 bg-[#2a2b33] p-2 rounded-lg shadow-md"
          >
            <EmojiPicker
              theme="dark"
              onEmojiClick={(emojiObject) =>
                setMessage((msg) => msg + emojiObject.emoji)
              }
            />
          </div>
        )}

        <button
          onClick={handleMessage}
          className="p-3 bg-[#8417ff] rounded-full hover:bg-[#6b13cc] transition-all duration-300 shadow-lg focus:outline-none"
        >
          <IoSend className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
}

export default Messagebar;
