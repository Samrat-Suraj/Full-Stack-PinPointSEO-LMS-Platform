import { authApi } from "@/features/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"
import filterSlice from "../features/filterSlice"
import { courseApi } from "@/features/courseApi";
import { purchaseApi } from "@/features/purchaseApi";
import { progressApi } from "@/features/progressApi";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer,
    [purchaseApi.reducerPath] : purchaseApi.reducer,
    [progressApi.reducerPath] : progressApi.reducer,
    auth: authSlice,
    filterAndSearch : filterSlice,
})

export default rootReducer