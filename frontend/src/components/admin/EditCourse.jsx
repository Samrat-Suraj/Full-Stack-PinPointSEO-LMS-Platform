import { useEditCourseMutation, useGetCourseByIdQuery, useTogglePublishCourseMutation } from '@/features/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const EditCourse = () => {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const { data, isLoading, refetch } = useGetCourseByIdQuery(id)
    const [image, setImage] = useState("")
    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        coursePrice: "",
        subTitle: "",
        category: "",
        courseLevel: ""
    })

    const [editCourse, { data: editData, isLoading: editIsLoading, error: editError, isSuccess: editIsSuccess }] = useEditCourseMutation()
    const [togglePublishCourse, { data: ToggleData, isLoading: ToggleIsLoading, error: ToggleError, isSuccess: ToggleIsSuccess }] = useTogglePublishCourseMutation()
    const onChangeSetImage = (e) => {
        setImage(e.target.files[0])
    }

    const onChangehander = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }


    const onClickHander = async () => {
        const form = new FormData()
        form.append("title", inputData.title)
        form.append("description", inputData.description)
        form.append("subTitle", inputData.subTitle)
        form.append("category", inputData.category)
        form.append("courseLevel", inputData.courseLevel)
        form.append("coursePrice", inputData.coursePrice)
        if (image) {
            form.append("courseThumbnail", image)
        }
        await editCourse({ form, id })
    }

    useEffect(() => {
        if (editData && editIsSuccess) {
            refetch()
            navigate("/admin/course")
            toast.success(editData.message)
        }
        if (editError) {
            toast.error(editError.message)
        }
    }, [editCourse, editData, editIsLoading, editError, editIsSuccess])

    useEffect(() => {
        setInputData({
            title: data?.course?.title || "",
            description: data?.course?.description || "",
            coursePrice: data?.course?.coursePrice || "",
            subTitle: data?.course?.subTitle || "",
            category: data?.course?.category || "",
            courseLevel: data?.course?.courseLevel || ""
        })
    }, [editCourse, editData, editIsLoading, editError, editIsSuccess, data, isLoading])

    const publishStatusHander = async (action) => {
        try {
            const res = await togglePublishCourse({ id, query: action })
            if (res.data) {
                refetch()
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error("Failed To Publish And UnPublic Course")
        }
    }

    return (
        <div className='bg-green-50 dark:bg-gray-800 h-full w-full p-2 lg:p-6 md:p-6 rounded-xl ml-1'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='lg:text-2xl md:text-xl font-semibold text-green-700 dark:text-green-400'>Edit Course Details</h1>
                <Link to={"lecture"}><p className='text-gray-600 dark:text-gray-400 text-xs cursor-pointer font-semibold '>Go to Lecture Page</p></Link>
            </div>

            <div className='flex justify-between items-center mt-4 mb-4'>
                <div>
                    <h2 className='text-lg font-semibold text-green-600 dark:text-green-400'>Basic Information</h2>
                    <p className='text-gray-500 dark:text-gray-300 text-xs'>Edit Course Details Here. Click Save When Done</p>
                </div>
                <div className='flex gap-3 flex-col items-center'>
                    <button disabled={data?.course?.lectures.length === 0} onClick={() => publishStatusHander(data?.course?.isPubliced ? false : true)} className='px-4 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-green-700 dark:text-green-400 rounded-full hover:bg-gray-300 dark:hover:bg-green-600 transition duration-300'>
                        {data?.course?.isPubliced ? "Unpublish" : "Publish"}
                    </button>
                    <button className='px-4 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-400 dark:hover:bg-red-600 transition duration-300'>
                        Remove
                    </button>
                </div>
            </div>

            <div className='space-y-3 mb-6'>
                <div className='flex flex-col'>
                    <label className='text-green-700 dark:text-green-400 text-sm font-medium'>Course Title</label>
                    <input name='title' onChange={onChangehander} value={inputData.title} type="text" placeholder='Enter Course Title' className='p-2 bg-green-50 dark:bg-gray-700 mt-2 rounded-lg border-2 border-green-200 dark:border-gray-600 focus:outline-none text-xs' />
                </div>

                <div className='flex flex-col'>
                    <label className='text-green-700 dark:text-green-400 text-sm font-medium'>Course Subtitle</label>
                    <input name='subTitle' onChange={onChangehander} value={inputData.subTitle} type="text" placeholder='Enter Course Subtitle' className='p-2 bg-green-50 dark:bg-gray-700 mt-2 rounded-lg border-2 border-green-200 dark:border-gray-600 focus:outline-none  text-xs' />
                </div>

                <div className='flex flex-col'>
                    <label className='text-green-700 dark:text-green-400 text-sm font-medium'>Description</label>
                    <textarea name='description' onChange={onChangehander} value={inputData.description} placeholder='Enter Course Description' className='p-2 bg-green-50 dark:bg-gray-700 mt-2 rounded-lg border-2 border-green-200 dark:border-gray-600 focus:outline-none  text-xs' rows="3" />
                </div>
            </div>

            <div className='space-y-3 mb-6'>
                <div>
                    <label className='text-sm dark:text-gray-300' htmlFor="">Category</label>
                    <select onChange={onChangehander} name='category' value={inputData.category} className="w-full p-2 text-sm border-2 bg-green-50 dark:bg-gray-700 mt-2 border-green-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none">
                        <option value="">Select Category</option>
                        <option value="nextjs">Next.js</option>
                        <option value="reactjs">React.js</option>
                        <option value="full-stack-web-development">Full Stack Web Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="nodejs">Node.js</option>
                        <option value="vuejs">Vue.js</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="angular">Angular</option>
                        <option value="ruby-on-rails">Ruby on Rails</option>
                        <option value="machine-learning">Machine Learning</option>
                        <option value="ai">AI</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="ux-ui-design">UX/UI Design</option>
                        <option value="cloud-computing">Cloud Computing</option>
                    </select>
                </div>

                <div className='flex gap-2 lg:flex-row md:flex-row mt-2 flex-col'>
                    <div className='flex flex-col w-full'>
                        <label className='text-green-700 dark:text-green-400 text-sm font-medium'>Course Level</label>
                        <select name='courseLevel' onChange={onChangehander} value={inputData.courseLevel} className='p-2 rounded-lg border-2 bg-green-50 dark:bg-gray-700 border-green-200 dark:border-gray-600 focus:outline-none text-xs'>
                            <option value="">Select Course Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-green-700 dark:text-green-400 text-sm font-medium'>Course Price</label>
                        <input name='coursePrice' onChange={onChangehander} value={inputData.coursePrice} type="number" placeholder='Enter Course Price' className='p-2 bg-green-50 dark:bg-gray-700 rounded-lg border-2 border-green-200 dark:border-gray-600 focus:outline-none  text-xs' />
                    </div>
                </div>
            </div>

            <div className='flex flex-col mb-6'>
                <label className='text-green-700 dark:text-green-400 text-sm font-medium'>Course Thumbnail</label>
                <input name='courseThumbnail' type="file" onChange={onChangeSetImage} className='p-2 mt-2 rounded-lg border-2 border-green-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-xs' />
            </div>

            {image ? (
                <div className='mt-4'>
                    <img className='w-full max-w-[250px] h-[150px] object-cover rounded-lg shadow-md' src={URL.createObjectURL(image)} alt="Course Thumbnail" />
                </div>
            ) : data?.course?.courseThumbnail ? <img className='w-full max-w-[250px] h-[150px] object-cover rounded-lg shadow-md' src={data?.course?.courseThumbnail} alt="" /> : <></>}

            <button onClick={onClickHander} className='p-2 flex items-center justify-center gap-2 rounded-lg w-full text-center mt-6 mb-3 bg-green-500 dark:bg-green-600 text-white font-bold'>{editIsLoading ? <Loader2 className='h-5 w-4 animate-spin' /> : <></>} Save</button>
        </div>
    )
}

export default EditCourse
