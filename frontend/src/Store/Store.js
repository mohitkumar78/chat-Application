import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../Store/auth-slice.js';

const store = configureStore({
    reducer: {
        auth: authreducer,
    },
});

export default store;
