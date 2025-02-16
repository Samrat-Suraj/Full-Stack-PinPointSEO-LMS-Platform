import { useCreateCourseMutation } from '@/features/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        title: "",
        category: ""
    })

    const [createCourse, { data: CourseData, isLoading: CourseIsLoading, error: CourseError, isSuccess: CourseIsSuccess }] = useCreateCourseMutation()
    const onChangeHander = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const OnClickCreateCourse = async (e) => {
        await createCourse(inputData)
    }

    useEffect(() => {
        if (CourseIsSuccess && CourseData) {
            navigate("/admin/course")
            toast.success(CourseData.message)
        }
        if (CourseError) {
            toast.success(CourseError.data.message)
        }
    }, [CourseData, CourseIsLoading, CourseError, CourseIsSuccess, createCourse])

    return (
        <div className="flex flex-col h-full bg-green-50 dark:bg-gray-800 lg:p-8 md:p-8 p-4 ml-2 mx-auto">
            <h1 className="lg:text-3xl md:text-3xl text-xl text-green-700 dark:text-white font-semibold mb-3">Add a New Course</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Add some basic details for your new course.</p>
            <div className="w-full mb-6 mt-4">
                <input
                    type="text"
                    onChange={onChangeHander}
                    value={inputData.title}
                    name='title'
                    placeholder="Enter Course Name"
                    className="w-full p-2 text-sm mb-4 border-2 border-green-500 dark:border-green-300 rounded-lg text-gray-700 dark:text-white focus:outline-none dark:bg-gray-700"
                />
                <select
                    value={inputData.category}
                    name="category"
                    onChange={onChangeHander}
                    className="w-full p-2 text-sm border-2 bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-300 rounded-lg text-gray-700 dark:text-white focus:outline-none"
                >
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
            <div className="flex space-x-4">
                <button onClick={() => navigate("/admin/course")} className="px-6 py-3 text-sm bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700">
                    Cancel
                </button>
                <button onClick={OnClickCreateCourse} className="px-6 py-3 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-500">
                    {
                        CourseIsLoading ? <Loader2 className='h-5 w-5 animate-spin mr-2' /> : "Create"
                    }
                </button>
            </div>
        </div>
    )
}

export default AddCourse
