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
            console.log(action.payload.chatType)
            state.selectedchatType = action.payload.chatType
        }
        ,
        setSelectedChatData: (state, action) => {
            console.log(action.payload.contact)
            state.selectedChatData = action.payload.contact
        },
        closeChat: (state, action) => {
            state.selectedchatType = undefined
            state.selectedChatData = null

        }
    }
})

export const { setChatType, setSelectedChatData, closeChat } = contactSlice.actions;
export default contactSlice.reducer