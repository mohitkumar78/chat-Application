import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import contactReducer from "./contact-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        contact: contactReducer,
    },

});

export { store };