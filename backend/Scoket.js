import { Server as SocketIoServer } from "socket.io"; // Corrected typo

const socketSetup = (server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: "http://localhost:5173", // Remove trailing slash
            methods: ["GET", "POST"],
            credentials: true, // Corrected typo here
        },
    })

    const disconnect = (scoket) => {
        console.log(`Client Disconnected ${scoket.id}`)

        for (const [userid, scoketId] of userScoketMap.entries()) {
            if (scoketId === scoket.id) {
                userScoketMap.delete(userid);
                break;
            }
        }
    }
    const userScoketMap = new Map()
    io.on("connection", (socket) => {
        const userid = socket.handshake.query.userId

        if (userid) {
            userScoketMap.set(userid, socket.id)
            console.log(`user ${userid} is connect with scoket id ${socket.id}`)
        }
        else {
            console.log("userid is not provied during scoket connection")
        }
    })

    io.on("disconnect", () => disconnect(scoket))

};

export default socketSetup;