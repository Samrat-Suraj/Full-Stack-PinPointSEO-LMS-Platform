import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/authApi";
import { courseApi } from "@/features/courseApi";
import { purchaseApi } from "@/features/purchaseApi";
import { progressApi } from "@/features/progressApi";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (middlewareDefault) => middlewareDefault().concat(authApi.middleware , courseApi.middleware , purchaseApi.middleware , progressApi.middleware)
})

const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();

