import { BookOpen, BookPlus, LayoutDashboard, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
    const [active, setActive] = useState('Dashboard')

    return (
        <div className="lg:w-[240px] md:w-[240px] w-[80px] p-4 border-r h-screen bg-green-50 dark:bg-gray-800 text-black dark:text-white">
            <h1 className="text-2xl lg:flex md:flex hidden font-semibold mb-4 text-center dark:text-white">Admin</h1>
            <div className='w-full h-[2px] bg-black dark:bg-gray-600'></div>
            <div className="flex flex-col gap-4 mt-2">
                <Link to={"dashboard"}>
                    <div
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-green-300 dark:hover:bg-green-600 transition-all ${active === 'Dashboard' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                        onClick={() => setActive('Dashboard')}
                    >
                        <LayoutDashboard className="text-xl" />
                        <p className="text-sm lg:flex md:flex hidden">Dashboard</p>
                    </div>
                </Link>

                <Link to={"course"}>
                    <div
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-green-300 dark:hover:bg-green-600 transition-all ${active === 'Course' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                        onClick={() => setActive('Course')}
                    >
                        <BookOpen className="text-xl" />
                        <p className="text-sm lg:flex md:flex hidden">Course</p>
                    </div>
                </Link>

                <Link to={"add"}>
                    <div
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-green-300 dark:hover:bg-green-600 transition-all ${active === 'AddCourse' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                        onClick={() => setActive('AddCourse')}
                    >
                        <BookPlus className="text-xl" />
                        <p className="text-sm lg:flex md:flex hidden">Add Course</p>
                    </div>
                </Link>

                <Link to={"/profile/course"}>
                    <div
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-green-300 dark:hover:bg-green-600 transition-all ${active === 'Profile' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                        onClick={() => setActive('Profile')}
                    >
                        <User className="text-xl" />
                        <p className="text-sm lg:flex md:flex hidden">Profile</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminSideBar
