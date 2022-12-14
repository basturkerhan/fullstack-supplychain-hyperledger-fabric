import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    userRole: null,
    userOrganization: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setUserOrganization: (state, action) => {
            state.userOrganization = action.payload;
        }
    }
});

export const {setUserId, setUserRole, setUserOrganization} = userSlice.actions;
export default userSlice.reducer;