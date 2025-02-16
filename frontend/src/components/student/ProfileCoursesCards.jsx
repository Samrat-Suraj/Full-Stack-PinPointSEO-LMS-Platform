import React from 'react'
import CourseCard from './CourseCard'
import CardSkeleton from './CardSkeleton'
import { useLoadUserQuery } from '@/features/authApi'

const ProfileCoursesCards = () => {
    const { data: userData, isLoading, refetch } = useLoadUserQuery()
    return (
        <div className=''>
            <h1 className='text-3xl font-bold p-3 mt-4'>Enrolled Course</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3 w-full ml-3 '>
                {
                    isLoading ?
                        userData?.user?.enrollCourse?.map((item, index) => {
                            return (
                                <CardSkeleton key={index} />
                            )
                        })
                        :
                        userData?.user?.enrollCourse?.length === 0 ? <p className='bg-red-600 text-white font-semibold p-2'>No Course Enrolled</p> :
                            userData?.user?.enrollCourse?.map((course) => {
                                return (
                                    <CourseCard key={course?._id} course={course} />
                                )
                            })
                }
            </div>
        </div>
    )
}

export default ProfileCoursesCards