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
        updateUser: (state, action) => {
            const updatedUsers = state.user.map((user) => {
                if (user._id === action.payload.user._id) {
                    return { ...user, ...action.payload.user };
                }
                return user;  // If no match, return the user as is
            });
            state.user = updatedUsers;  // Update the state with the modified array
        }

    },
});

// Correctly export the setUser action
export const { setUser, updateUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
