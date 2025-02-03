import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedchatType: undefined,
    selectedChatData: null

}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setChatType: (state, action) => {
            state.selectedchatType = action.payload.chatType
        }
        ,
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload.contact
        }
    }
})

export const { setChatType, setSelectedChatData } = contactSlice.actions;
export default contactSlice.reducer