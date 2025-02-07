import { createContext, useContext, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setSelectedChatData } from "../Store/contact-slice";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { selectedchatType, selectedChatData } = useSelector(
    (store) => store.contact
  );

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:4000", {
        withCredentials: true,
        query: { userId: user._id },
      });

      socket.current.on("connect", () => {
        console.log("✅ Connected to socket server:", socket.current.id);
      });

      // ✅ Fix typo: Use "receiveMessage" instead of "reciveMessage"
      const handleMessage = (message) => {
        console.log("✅ Message received on client:", message);
        if (
          selectedchatType !== undefined &&
          selectedChatData &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          dispatch(setSelectedChatData({ message }));
        }
      };

      socket.current.on("receiveMessage", handleMessage); // ✅ Correct event name

      return () => {
        if (socket.current) {
          socket.current.off("receiveMessage", handleMessage);
          socket.current.disconnect();
        }
      };
    }
  }, [user, dispatch, selectedchatType, selectedChatData]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
