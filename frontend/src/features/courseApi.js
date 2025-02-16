import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const COURSE_API = "http://localhost:5000/api/v1/course"

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refech_Lecture"],

    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (fromData) => ({
                url: "/",
                body: fromData,
                method: "POST"
            })
        }),
        getCreatorCourses: builder.query({
            query: () => ({
                url: "/",
                method: "GET"
            })
        }),

        editCourse: builder.mutation({
            query: ({ form, id }) => ({
                url: `/${id}`,
                method: "PUT",
                body: form
            })
        }),
        getCourseById: builder.query({
            query: (id) => ({
                method: "GET",
                url: `${id}`
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                method: "GET",
                url: "published-courses/all"
            })
        }),
        createLecture: builder.mutation({
            query: ({ fromData, id }) => ({
                url: `/${id}/lecture`,
                method: "POST",
                body: fromData,
            })
        }),
        getCourseLecture: builder.query({
            query: (id) => ({
                url: `/${id}/lecture`,
                method: "GET",
            }),
            providesTags: ["Refech_Lecture"]
        }),
        editLecture: builder.mutation({
            query: ({ leactureTitle, id, lectureId, isPreviewFree }) => ({
                body: { leactureTitle, isPreviewFree },
                url: `/${id}/lecture/${lectureId}/edit`,
                method: "POST"
            })
        }),
        removeLecture: builder.mutation({
            query: ({ id, lectureId }) => ({
                url: `/${id}/lecture/${lectureId}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ["Refech_Lecture"]
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "GET"
            })
        }),
        togglePublishCourse: builder.mutation({
            query: ({ id, query }) => ({
                url: `/${id}?publish=${query}`,
                method: "PATCH"
            })
        }),
    })
})

export const {
    useCreateCourseMutation,
    useGetCreatorCoursesQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useGetAllCoursesQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    useTogglePublishCourseMutation,
} = courseApi