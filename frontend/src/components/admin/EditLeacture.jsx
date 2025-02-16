import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Progress } from '../ui/progress'
import { toast } from 'sonner'
import { useEditLectureMutation, useGetCourseLectureQuery, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/courseApi'

const EditLecture = () => {
    const navigate = useNavigate()
    const [uploadLoading, setUploadLoading] = useState(false)
    const param = useParams()
    const lectureId = param.lectureId
    const id = param.id
    const [editLecture, { data, isLoading, isSuccess, error }] = useEditLectureMutation()
    const [leactureTitle, setLeactureTitle] = useState("")
    const [removeLecture , {isSuccess : removeIsSuccess , error : removeError , isLoading : removeIsLoading , data : removeData}] = useRemoveLectureMutation()
    const {data : lectureData} = useGetLectureByIdQuery(lectureId)

    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [buttonDisable, setButtonDisable] = useState(true)

    const handelFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("videoUrl", file);
            setMediaProgress(true);

            try {
                setUploadLoading(true)
                const res = await axios.post(
                    `http://localhost:5000/api/v1/course/${id}/lecture/${lectureId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: ({ loaded, total }) => {
                            const progress = Math.round((loaded / total) * 100);
                            setUploadProgress(progress);
                        },
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setLeactureTitle("")
                    setUploadVideoInfo(res?.lecture);
                    setButtonDisable(false);
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Video Upload failed");
                setButtonDisable(false);
            } finally {
                setMediaProgress(false);
                setUploadLoading(false)
            }
        }
    };

    const onClickHander = async () => {
        await editLecture({ id, lectureId, isPreviewFree, leactureTitle })
    }
    const onClickDeleteLecture = async () => {
        await removeLecture({ id , lectureId })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(`/admin/course/${id}/lecture`)
            toast.success(data.message)
        }
        if (error) {
            toast.error(error.data.message)
        }
        if(removeError){
            toast.error(removeError.data.message)
        }
        if(removeIsSuccess){
            navigate(`/admin/course/${id}/lecture`)
            toast.success(removeData.message)
        }
        if(lectureData?.lecture?.leactureTitle){
            setLeactureTitle(lectureData?.lecture?.leactureTitle)
        }
        setIsPreviewFree(lectureData?.lecture?.isPreviewFree)
    }, [editLecture, data, isLoading, isSuccess, error , removeIsSuccess , removeError , removeIsLoading , removeData , lectureData])

    const toogleFree = () => {
        setIsPreviewFree(!isPreviewFree);
    }

    return (
        <div className="mx-auto p-4 rounded-lg bg-gray-900 text-gray-100">
            <div className='flex items-center gap-2'>
                <ArrowLeft className='cursor-pointer text-gray-300' onClick={() => navigate(`/admin/course/${id}/lecture`)} />
                <h1 className="text-xl font-semibold text-gray-100">Update Your Lecture</h1>
            </div>

            <div className="mt-4 text-gray-300">
                <p className="text-sm font-medium">Edit Lecture</p>
                <p className="text-xs">Make changes and click Save when done.</p>
            </div>

            <div className="mt-6">
                <button onClick={onClickDeleteLecture} className="bg-red-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                    Remove Lecture
                </button>
            </div>

            <div className="mt-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-xs font-medium text-gray-200">Title</label>
                    <input
                        type="text"
                        id="title"
                        onChange={(e) => setLeactureTitle(e.target.value)}
                        value={leactureTitle}
                        className="mt-1 p-2 w-full text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>

                <div>
                    <label htmlFor="video" className="block text-xs font-medium text-gray-200">Video <span className='text-red-500 font-semibold'>*</span></label>
                    <input
                        onChange={handelFileChange}
                        type="file"
                        id="video"
                        accept='video/*'
                        className="mt-1 p-2 w-full text-sm border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
                    />
                </div>

                <div className="flex items-center space-x-2 mt-4">
                    <Switch checked={isPreviewFree} onCheckChange={setIsPreviewFree} onClick={toogleFree} className="text-gray-300" />
                    <p className="text-xs text-gray-200">Is This Video Free?</p>
                </div>

                {
                    mediaProgress && (
                        <div className="mt-2">
                            <Progress value={uploadProgress} />
                            <p className="text-xs text-gray-500">{uploadProgress}%</p>
                        </div>
                    )
                }
            </div>

            <div className="mt-6">
                <button
                    onClick={onClickHander}
                    className={`w-full cursor-default ${uploadLoading ? 'bg-gray-600' : 'bg-blue-500'} text-white text-xs py-2 rounded-lg hover:${uploadLoading ? 'bg-gray-700' : 'bg-blue-600'} transition duration-200`}
                    disabled={uploadLoading || buttonDisable}
                >
                    {uploadLoading ? 'Uploading...' : 'Update Lecture'}
                </button>
            </div>
        </div>
    )
}

export default EditLecture
