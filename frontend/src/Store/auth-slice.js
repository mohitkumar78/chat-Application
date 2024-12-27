import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    profileSetup: fasle
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.profileSetup = action.payload.profileSetup
        }
    }

})
export const { setUser } = action.reducers
export default authSlice.reducer