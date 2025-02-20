import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channels: []
}
const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannel: (state, action) => {
            state.channels = action.payload.Channel
        },
        addChannel: (state, action) => {
            state.channels = [...state.channels, action.payload.Channel]
        }
    }
})
export const { setChannel, addChannel } = channelSlice.actions;
export default channelSlice;