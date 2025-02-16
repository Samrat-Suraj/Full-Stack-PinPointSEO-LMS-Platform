import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/courseApi'
import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const AddLecture = () => {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation()
    const { data: lectureData , refetch } = useGetCourseLectureQuery(id)
    const [fromData, setFromData] = useState({
        leactureTitle: ""
    })

    const onChangeHander = (e) => {
        setFromData({ ...fromData, [e.target.name]: e.target.value })
    }

    const onClickHander = async () => {
        await createLecture({ fromData, id })
    }

    useEffect(() => {
        if (isSuccess && data) {
            refetch()
            setFromData({
                leactureTitle : ""
            })
            toast.success(data.message)
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [createLecture, data, isLoading, isSuccess, error , lectureData])

    return (
        <div className="max-w-4xl mx-auto p-4 rounded-lg bg-gray-900 text-gray-100">
            <h1 className="text-xl font-semibold text-gray-100 mb-2">Let's Add A Lecture</h1>
            <p className="text-sm text-gray-300 mb-4">Add some basic details for your new lecture.</p>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        name='leactureTitle'
                        onChange={onChangeHander}
                        value={fromData.leactureTitle}
                        placeholder="Lecture Title"
                        className="px-3 py-2 text-sm border border-gray-700 rounded-lg focus:outline-none bg-gray-800 text-gray-100"
                    />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => navigate(`/admin/course/${id}`)} className="text-xs p-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none">
                        Back To Course
                    </button>
                    <button onClick={onClickHander} className="text-xs p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none">
                        Add Lecture
                    </button>
                </div>

                <div className="mt-8">
                    {lectureData?.lectures?.map((lecture, index) => {
                        return (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                                <p className="text-xs text-gray-300">
                                    Lecture {index + 1} : {lecture?.leactureTitle}
                                </p>
                                <Link to={`${lecture?._id}`} ><Edit className="text-gray-400 hover:text-indigo-500 cursor-pointer" /></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddLecture
