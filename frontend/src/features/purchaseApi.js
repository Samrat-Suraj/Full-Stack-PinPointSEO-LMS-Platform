import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const PURCHASE_URL = "http://localhost:5000/api/v1/purchase"
export const purchaseApi = createApi({
    reducerPath : "purchaseApi",
    baseQuery : fetchBaseQuery({
        baseUrl : PURCHASE_URL,
        credentials : "include"
    }),
    endpoints : (builder) => ({
        createCheckOutSession : builder.mutation({
            query : (courseId) => ({
                url : "/checkout/create-checkout-session",
                body : {courseId},
                method : "POST"
            })
        }),
        getCourseDetailWithStatus : builder.query({
            query : (id) => ({
                method : "GET",
                url : `/course/${id}/detail-with-status`
            })
        }),
        getPurchesCourse : builder.query({
            query : () => ({
                method : "GET",
                url : `/`
            })
        }),
    })
})


export const {
    useCreateCheckOutSessionMutation,
    useGetCourseDetailWithStatusQuery,
    useGetPurchesCourseQuery,
} = purchaseApi