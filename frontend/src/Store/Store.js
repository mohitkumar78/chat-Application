import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Store/auth-slice.js";
import contactReducer from "./contact-slice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        contact: contactReducer
    }
});

export { store };
