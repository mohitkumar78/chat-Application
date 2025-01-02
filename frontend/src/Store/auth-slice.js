import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: ""

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
            console.log(action.payload.user)
            console.log(state.user)
        },
    },
});

// Correctly export the setUser action
export const { setUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
