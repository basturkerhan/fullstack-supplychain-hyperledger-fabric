import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import deviceSlice from "./slices/device";

export const store = configureStore({
    reducer: {
        user: userSlice,
        device: deviceSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    }
});