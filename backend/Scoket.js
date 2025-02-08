import { Server as SocketIoServer } from "socket.io";
import Message from "./Model/Message.model.js";

const socketSetup = (server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const sendMessage = async (message) => {
        try {
            console.log("✅ Received message:", message);
            const senderSocketId = userSocketMap.get(message.sender);
            const recipientSocketId = userSocketMap.get(message.recipient);

            const createMessage = await Message.create(message);

            const messageData = await Message.findById(createMessage._id)
                .populate("sender", "_id email firstname lastname image color")
                .populate("recipient", "_id email firstname lastname image color");

            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receiveMessage", messageData);
            }
            if (senderSocketId) {
                io.to(senderSocketId).emit("receiveMessage", messageData);
            }
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    };

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`✅ User ${userId} connected with socket ID ${socket.id}`);
        } else {
            console.log("❌ User ID not provided during socket connection.");
        }

        socket.on("sendMessage", (message) => sendMessage(message));

        socket.on("disconnect", () => {
            console.log(`⚠️ Client Disconnected: ${socket.id}`);
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    break;
                }
            }
        });
    });
};

export default socketSetup;
