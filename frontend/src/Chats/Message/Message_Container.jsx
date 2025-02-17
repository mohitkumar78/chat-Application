import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat } from "../../Store/contact-slice";
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
          dispatch(setSelectedChat({ message: response.data.messages })); // ✅ Send full array
        }
      } catch (error) {
        console.log("Error in fetching message history:", error);
      }
    };

    if (selectedChatData?._id && selectedchatType === "contact") {
      getMessage();
    }
  }, [selectedChatData, selectedchatType, token, dispatch]);

  // ✅ Debug: Log messages when Redux state updates
  useEffect(() => {
    console.log("Updated selectedChatMessage in Redux:", selectedChatMessage);
  }, [selectedChatMessage]);

  // ✅ Automatically scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const renderMessage = () => {
    if (
      !Array.isArray(selectedChatMessage) ||
      selectedChatMessage.length === 0
    ) {
      return <div className="text-center text-gray-500">No messages yet.</div>;
    }

    let lastDate = null;
    console.log(selectedChatMessage);
    return selectedChatMessage.map((message, index) => {
      console.log(message);
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
    console.log(message);
    return (
      <div
        className={`flex my-2 ${isSender ? "justify-start" : "justify-end"}`}
      >
        {message.messageType === "text" && (
          <div
            className={`p-3 rounded-lg max-w-[60%] break-words shadow-md transition-all transform scale-95 hover:scale-100 ${
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
            className={`p-3 rounded-lg max-w-[60%] break-words shadow-md transition-all transform scale-95 hover:scale-100 ${
              isSender
                ? "bg-[#8417ff] text-white border border-[#6b11cc] self-start"
                : "bg-[#2a2b33] text-white border border-[#ffffff]/20 self-end"
            }`}
          >
            {checkImage(message.fileUrl) && (
              <div className="cursor-pointer">
                <img
                  src={`http://localhost:4000/${message.fileUrl}`}
                  alt="Uploaded file"
                  height={300}
                  width={300}
                />
              </div>
            )}
          </div>
        )}
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
