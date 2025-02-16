import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        checkData: ""
    },
    reducers: {
        setCheckData: (state, action) => {
            state.checkData = action.payload;
        }
    }
});

export const { setCheckData } = filterSlice.actions;
export default filterSlice.reducer;
