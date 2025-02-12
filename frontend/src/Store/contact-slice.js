import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedchatType: undefined,
    selectedChatData: null,
    selectedChatMessage: [],
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setChatType: (state, action) => {
            state.selectedchatType = action.payload.chatType;
        },
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload.contact;
        },
        closeChat: (state) => {
            state.selectedchatType = undefined;
            state.selectedChatData = null;
            state.selectedChatMessage = [];
        },
        setSelectedChat: (state, action) => {
            console.log("Updating chat store...");

            if (!state.selectedChatMessage) {
                state.selectedChatMessage = [];
            }

            if (Array.isArray(action.payload.message)) {
                console.log("Setting full chat history...");
                state.selectedChatMessage = [
                    ...action.payload.message.map(msg => ({
                        content: msg.content,
                        recipient: msg.recipient?._id || msg.recipient,
                        sender: msg.sender?._id || msg.sender,
                        timestamp: msg.timestamp,
                    })),
                ];
            } else {
                console.log("Appending new message...");
                state.selectedChatMessage.push({
                    content: action.payload.message.content,
                    recipient: action.payload.message.recipient?._id || action.payload.message.recipient,
                    sender: action.payload.message.sender?._id || action.payload.message.sender,
                    timestamp: action.payload.message.timestamp,
                });
            }
        },
    },
});

export const { setChatType, setSelectedChatData, closeChat, setSelectedChat } = contactSlice.actions;
export default contactSlice.reducer;
