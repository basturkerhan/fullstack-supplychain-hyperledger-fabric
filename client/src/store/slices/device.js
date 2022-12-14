import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMobileDevice: null
}

export const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setIsMobileDevice: (state, action) => {
            state.isMobileDevice = action.payload;
        }
    }
});

export const {setIsMobileDevice} = deviceSlice.actions;
export default deviceSlice.reducer;