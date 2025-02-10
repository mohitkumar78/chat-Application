import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Store/auth-slice.js';
import contactReducer from "./contact-slice.js";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Persist config for only auth slice
const authPersistConfig = {
    key: 'auth',
    storage,
};

// Persist only auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer, // Auth slice is persisted
    contact: contactReducer // Contact slice is not persisted
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['register', 'rehydrate'],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
