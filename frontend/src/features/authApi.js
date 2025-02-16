import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { loggedInUser, logOutUser } from "./authSlice"


const USER_API = "http://localhost:5000/api/v1/user"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                body: inputData,
                method: "POST"
            })
        }),
        loggedInUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                body: inputData,
                method: "POST"
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(loggedInUser({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        loggOutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(logOutUser({}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET"
            }),
            async onQueryStarted(_ , {queryFulfilled , dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(loggedInUser({user : result.data.user}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        UpdateUser : builder.mutation({
            query : (formData) =>({
                url : "profile",
                method : "POST",
                body : formData
            })
        })
    })
})

export const {
    useLoggedInUserMutation,
    useRegisterUserMutation,
    useLoggOutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
} = authApi