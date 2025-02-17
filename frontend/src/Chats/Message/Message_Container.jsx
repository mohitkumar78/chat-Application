import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat } from "../../Store/contact-slice";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";

import axios from "axios";

function Message_Container() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);
  const { selectedChatMessage, selectedChatData, selectedchatType } =
    useSelector((store) => store.contact);

  const scrollRef = useRef();
  const checkImage = (filePath) => {
    const imageRegax = /\.(jpg|jpeg|png|bmp|tiff|webp|svg|ico|heic|hefif)$/i;
    return imageRegax.test(filePath);
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/message/getAllmessage",
          { token, recipient: selectedChatData?._id },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.messages) {
          console.log("Fetched messages from API:", response.data.messages);
          dispatch(setSelectedChat({ message: response.data.messages }));
        }
      } catch (error) {
        console.log("Error in fetching message history:", error);
      }
    };

    if (selectedChatData?._id && selectedchatType === "contact") {
      getMessage();
    }
  }, [selectedChatData, selectedchatType, token, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);
  const FileDownload = async (url) => {
    try {
      const response = await fetch(`http://localhost:4000/${url}`);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = url.split("/").pop(); // Extracting filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const renderMessage = () => {
    if (
      !Array.isArray(selectedChatMessage) ||
      selectedChatMessage.length === 0
    ) {
      return <div className="text-center text-gray-500">No messages yet.</div>;
    }

    let lastDate = null;
    return selectedChatMessage.map((message, index) => {
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
    const isSender = message.sender === user?._id;

    return (
      <div
        className={`flex my-2 ${
          isSender ? "justify-start" : "justify-end"
        } px-2`}
      >
        {message.messageType === "text" && (
          <div
            className={`p-3 rounded-lg max-w-[80%] sm:max-w-[60%] break-words shadow-md transition-all transform scale-95 hover:scale-100 ${
              isSender
                ? "bg-[#8417ff] text-white border border-[#6b11cc] self-start"
                : "bg-[#2a2b33] text-white border border-[#ffffff]/20 self-end"
            }`}
          >
            {message?.content}
            <div className="mt-1 text-xs text-gray-400">
              {moment(message?.timestamp).format("LT")}
            </div>
          </div>
        )}

        {message.messageType === "file" && (
          <div
            className={`p-3 rounded-lg max-w-[80%] sm:max-w-[60%] break-words shadow-md transition-all transform scale-95 hover:scale-100 ${
              isSender
                ? "bg-[#8417ff] text-white border border-[#6b11cc] self-start"
                : "bg-[#2a2b33] text-white border border-[#ffffff]/20 self-end"
            }`}
          >
            {checkImage(message.fileUrl) ? (
              <div className="cursor-pointer">
                <img
                  src={`http://localhost:4000/${message.fileUrl}`}
                  alt="Uploaded file"
                  className="w-full max-w-[300px] h-auto rounded-md"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="p-3 text-3xl rounded-full text-white/80 bg-black/20">
                  <MdFolderZip />
                </span>
                <span className="block mt-1 text-sm">
                  {message.fileUrl.split("/").pop()}
                </span>
                <span
                  className="p-3 text-3xl transition-all duration-300 rounded-full cursor-pointer bg-black/20 hover:bg-black/50"
                  onClick={FileDownload(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 w-full p-4 px-4 sm:px-8 overflow-y-auto max-h-[80vh] custom-scrollbar">
      {renderMessage()}
      <div ref={scrollRef}></div>
    </div>
  );
}

export default Message_Container;
