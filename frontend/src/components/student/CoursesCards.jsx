import React from 'react'
import CourseCard from './CourseCard'
import CardSkeleton from './CardSkeleton'
import { useGetAllCoursesQuery } from '@/features/courseApi'

const CoursesCards = () => {
  const { data, isLoading } = useGetAllCoursesQuery()
  return (
    <div id='Course' className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6 md:grid-cols-2'>
      {
        isLoading ?
          data?.courses?.map((course) => {
            return (
              <CardSkeleton key={course?._id} />
            )
          }) :
          data?.courses?.slice(0,6)?.map((course) => {
            return (
              <CourseCard key={course?._id} course={course} />
            )
          })
      }
    </div>
  )
}

export default CoursesCards