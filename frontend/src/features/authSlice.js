import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loggedInUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logOutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { logOutUser, loggedInUser } = authSlice.actions;
export default authSlice.reducer;
