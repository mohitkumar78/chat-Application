import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSelectedChat } from "../Store/contact-slice";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io("http://localhost:4000", {
        withCredentials: true,
        query: { userId: user._id },
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Connected to socket server:", socketRef.current.id);
      });

      socketRef.current.on("receiveMessage", (message) => {
        console.log("📩 Message received:", message);
        dispatch(setSelectedChat(message));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user, dispatch]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
