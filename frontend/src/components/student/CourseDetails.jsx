import { useGetCourseByIdQuery } from '@/features/courseApi'
import { Lock, PlayCircle, Timer, VideoIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import BuyCourseButton from './BuyCourseButton'
import { useGetCourseDetailWithStatusQuery } from '@/features/purchaseApi'

const CourseDetails = () => {
    const navigate = useNavigate()
    const param = useParams()
    const id = param.id
    const { data, isLoading, refetch } = useGetCourseDetailWithStatusQuery(id)
    const Free = true
    
    const onClickContinusCourseHander = () =>{
        navigate(`/course-progress/${id}`)
    }

    useEffect(() => {
        refetch()
    }, [id, data, isLoading])

    return (
        <div className='bg-green-50 dark:bg-gray-900 p-4 sm:p-4 md:p-4'>

            <div className='bg-green-600 dark:bg-green-800 p-6 text-white dark:text-white rounded-xl shadow-sm'>
                <h1 className='text-3xl sm:text-4xl font-semibold'>{data?.course?.title}</h1>
                <p className='text-xl mt-2'>{data?.course?.subTitle}</p>
                <p className='text-sm mt-1'>Created By <span className='text-green-300'>{data?.course?.creator?.firstName} {data?.course?.creator?.lastName}</span></p>
                <div className='flex items-center text-sm mt-2'>
                    <Timer size={15} />
                    <p className='ml-1'>Last Updated :- {data?.course?.updatedAt?.split("T")[0]}</p>
                </div>
                <p className='text-sm mt-2'>Students Enrolled: <span className='text-green-300'>{data?.course?.enrolledStudent?.length}</span></p>
            </div>
            <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <div className='w-full md:w-2/3'>
                    <h1 className='text-2xl sm:text-3xl font-semibold text-green-800 dark:text-green-400'>Description</h1>
                    <p className='text-sm text-gray-700 dark:text-gray-300 mt-4'>
                        {data?.course?.description}
                    </p>

                    <div className='border p-4 shadow-sm rounded-lg border-green-500 dark:border-green-700 mt-6 pt-4'>
                        <h2 className='text-xl sm:text-2xl text-green-700 dark:text-green-400 font-semibold'>Course Content</h2>
                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2'>{data?.course?.lectures?.length} Lectures</p>
                        <div className='mt-4 text-sm'>
                            {
                                data?.course?.lectures?.map((lecture) => {
                                    return (
                                        <div key={lecture?._id} className='flex items-center mt-2 text-green-600 dark:text-green-400 cursor-pointer hover:text-green-500'>
                                            {Free ? <PlayCircle width={15} className='mr-2' /> : <Lock width={15} className='mr-2' />}
                                            <p className='text-sm'>{lecture?.leactureTitle}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-1/2'>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
                        <div className='relative pb-[56.25%] w-full h-0'>
                            <ReactPlayer
                                url={data?.course?.lectures[0]?.videoUrl}
                                className='absolute top-0 left-0 w-full h-full'
                                width="100%"
                                height="100%"
                                controls={true}
                            />
                        </div>
                        <p className='text-xl sm:text-2xl text-green-700 dark:text-green-400 font-semibold mt-4'>{data?.course?.lectures[0]?.leactureTitle}</p>
                        <div className='h-[1px] bg-green-400 dark:bg-green-600 mt-2'></div>
                        <p className='text-lg sm:text-xl text-gray-800 dark:text-gray-200 font-semibold mt-2'>Rs : {data?.course?.coursePrice ? data?.course?.coursePrice : 0}/-</p>
                        <button className='w-full flex items-center justify-center bg-green-600 dark:bg-green-700 text-white text-sm sm:text-base py-3 rounded-lg hover:bg-green-500 dark:hover:bg-green-600 transition mt-4'>
                            {
                                data?.purchased ? <p onClick={onClickContinusCourseHander}>Continuous</p> : <BuyCourseButton id={id} />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails
