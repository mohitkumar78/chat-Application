import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ChannelContact: []
}
const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannelContact: (state, action) => {
            state.ChannelContact = action.payload.conta
        }
    }

})