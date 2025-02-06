import { createContext, useContext, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// Fix spelling mistake in the context name
const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:4000", {
        withCredentials: true,
        query: { userId: user._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
