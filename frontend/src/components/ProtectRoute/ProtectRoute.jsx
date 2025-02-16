import { useLoadUserQuery } from '@/features/authApi'
import { useGetCourseDetailWithStatusQuery } from '@/features/purchaseApi'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth)
    const { isLoading: userLoading } = useLoadUserQuery()

    if (userLoading) {
        return <p>Loading...</p>
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }
    return children
}

export const ProtectRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth)
    const { isLoading: userLoading } = useLoadUserQuery()

    if (userLoading) {
        return <p>Loading...</p>  // Or null/spinner as needed
    }

    if (!isAuthenticated) {
        return <Navigate to={"/auth"} />
    }
    return children
}

export const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth)
    const { isLoading: userLoading } = useLoadUserQuery()

    if (userLoading) {
        return <p>Loading...</p>  // Or null/spinner as needed
    }

    if (!isAuthenticated) {
        return <Navigate to={"/auth"} />
    }
    if (user.role !== "instructor") {
        return <Navigate to={"/"} />
    }
    return children
}

export const PurchesCourseProtectRoute = ({ children }) => {
    const { id } = useParams()
    const { data, isLoading, isSuccess } = useGetCourseDetailWithStatusQuery(id)
    const { isLoading: userLoading } = useLoadUserQuery()

    if (userLoading || isLoading) {
        return <p>Loading...</p>
    }

    return data?.purchased ? children : <Navigate to={`/course-details/${id}`} />
}
