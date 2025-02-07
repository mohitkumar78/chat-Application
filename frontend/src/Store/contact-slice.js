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
            console.log(action.payload.chatType);
            state.selectedchatType = action.payload.chatType;
        },
        setSelectedChatData: (state, action) => {
            console.log(action.payload.contact);
            state.selectedChatData = action.payload.contact;
        },
        closeChat: (state) => {
            state.selectedchatType = undefined;
            state.selectedChatData = null;
        },
        setSelectedChat: (state, action) => {
            if (!state.selectedChatData) {
                state.selectedChatData = [];
            }

            state.selectedChatData.push({
                ...action.payload.message,
                recipient: state.selectedchatType === "channel"
                    ? action.payload.message.recipient
                    : action.payload.message.recipient._id,
                sender: state.selectedchatType === "channel"
                    ? action.payload.message.sender
                    : action.payload.message.sender._id,
            });
        }
    }
});

export const { setChatType, setSelectedChatData, closeChat, setSelectedChat } = contactSlice.actions;
export default contactSlice.reducer;
