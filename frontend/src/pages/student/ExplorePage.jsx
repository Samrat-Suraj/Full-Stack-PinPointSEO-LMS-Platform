import CourseCard from '@/components/student/CourseCard'
import CoursesCards from '@/components/student/CoursesCards'
import Filter from '@/components/student/Filter'
import { useGetAllCoursesQuery } from '@/features/courseApi'
import { setCheckData } from '@/features/filterSlice'
import { useGetCourseDetailWithStatusQuery } from '@/features/purchaseApi'
import { Item } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ExplorePage = () => {
    const navigate = useNavigate()
    const { checkData } = useSelector((state) => state.filterAndSearch);
    const { data, isLoading } = useGetAllCoursesQuery()
    console.log(data?.courses)
    const dispatch = useDispatch()
    const [text, setText] = useState("")

    useEffect(() => {
        dispatch(setCheckData(text))
    }, [text])

    const [filterData , setFilterData] = useState()

    useEffect(()=>{
        const filter = data?.courses?.filter((course)=>{
            if(!checkData){
                return true
            }else{
                return course?.title?.toLowerCase().includes(checkData?.toLowerCase()) || 
                course?.category?.toLowerCase().includes(checkData?.toLowerCase()) 
            }
        })
        setFilterData(filter)
    },[text , data?.courses , checkData])

    return (
        <div className='w-full flex-1 h-full bg-white dark:bg-gray-900'>
            <div className='flex mb-6 mt-5'>
                <input
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Search for courses..."
                    className='border text-sm focus-visible:outline-none p-3 rounded-lg border-green-300 dark:border-green-600 shadow-sm w-3/4 md:w-1/2 lg:w-1/3 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800'
                />
            </div>

            <div className='flex gap-2'>
                <Filter />
                <div className='grid flex-1 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-1'>
                    {
                        filterData?.map((course) => {
                            return (
                                <CourseCard key={course?.id} course={course} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
