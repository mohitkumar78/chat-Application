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
            state.selectedChatData = action.payload;
            state.selectedChatMessage = []; // Reset messages for new chat
        },
        closeChat: (state) => {
            state.selectedchatType = undefined;
            state.selectedChatData = null;
        },
        setSelectedChat: (state, action) => {
            state.selectedChatMessage.push(action.payload);
        },
    },
});

export const { setChatType, setSelectedChatData, closeChat, setSelectedChat } =
    contactSlice.actions;
export default contactSlice.reducer;
