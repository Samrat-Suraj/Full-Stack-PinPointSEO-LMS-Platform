import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const COURSE_PROGRESS_API = "http://localhost:5000/api/v1/progress"

export const progressApi = createApi({
    reducerPath : "progressApi",
    baseQuery : fetchBaseQuery({
        baseUrl : COURSE_PROGRESS_API,
        credentials : "include"
    }),
    endpoints : (builder) => ({
        getCourseProgress : builder.query({
            query : (id) => ({
                method : "GET",
                url : `${id}`
            })
        }),
        updateLectureProgress : builder.mutation({
            query : ({courseId , lectureId}) => ({
                method : "PUT",
                url : `/${courseId}/lecture/${lectureId}/view`
            })
        }),
        markAsCompleted : builder.mutation({
            query : (courseId)=> ({
                url : `/${courseId}/complete`,
                method : "PUT"
            })
        }),
        markAsUnCompleted : builder.mutation({
            query : (courseId)=> ({
                url : `/${courseId}/incomplete`,
                method : "PUT"
            })
        }),
    })
})

export const {
    useGetCourseProgressQuery,
    useMarkAsCompletedMutation,
    useMarkAsUnCompletedMutation,
    useUpdateLectureProgressMutation,
} = progressApi