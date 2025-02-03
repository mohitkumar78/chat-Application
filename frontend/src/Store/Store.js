import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../Store/auth-slice.js';
import contactreducer from "./contact-slice.js"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({
    auth: authreducer,
    contact: contactreducer

});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore non-serializable data paths in the store
                ignoredPaths: ['register', 'rehydrate'],
            },
        }),
});
const persistor = persistStore(store);
export { store, persistor };
