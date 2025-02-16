import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import DarkMode from './DarkMode'
import { AlignJustify } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLoggOutUserMutation } from '@/features/authApi'


const MobileSideBar = () => {
    const { user } = useSelector(store => store.auth)
    const [active, setActive] = useState("Home")
    const navigate = useNavigate()
    const [loggOutUser, { data, isSuccess, error, isLoading }] = useLoggOutUserMutation()

    useEffect(() => {
        if (isSuccess && data) {
            toast.success(data?.message)
            navigate("/auth")
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [data, isSuccess, error, isLoading, loggOutUser, user])

    return (
        <Sheet>
            <SheetTrigger className='lg:hidden md:hidden'>
                <AlignJustify className="" size={30} />
            </SheetTrigger>
            <SheetContent className="w-[270px] text-white">
                <SheetHeader className="p-2">
                    <SheetTitle className="flex justify-between items-center">
                        <div className='text-2xl font-semibold'>
                            <span className='text-green-500 font-bold'>P</span>inPointSE<span className='text-orange-400 font-bold'>O</span>
                        </div>
                        <DarkMode />
                    </SheetTitle>
                    <SheetDescription>
                        <ul className='flex flex-col mt-7 text-lg gap-6 text-gray-500'>
                            <Link to={"/"}>
                                <li
                                    onClick={() => setActive("Home")}
                                    className={`${active === "Home" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500" : "hover:text-green-500 cursor-pointer"} py-2 px-4 rounded-md`}
                                >
                                    Home
                                </li>
                            </Link>

                            <a                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/');
                                    setTimeout(() => {
                                        window.location.hash = '#About';
                                    }, 100);
                                    setActive("About")
                                }}
                                className={`${active === "About" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500" : "hover:text-green-500 cursor-pointer"} py-2 px-4 rounded-md`}
                            >
                                About
                            </a>


                            <Link to={"/explore"}>
                                <a
                                    onClick={() => setActive("Course")}
                                    className={`${active === "Course" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500" : "hover:text-green-500 cursor-pointer"} py-2 px-4 rounded-md`}
                                >
                                    Course
                                </a>
                            </Link>
                            <a
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/');
                                    setTimeout(() => {
                                        window.location.hash = '#Contact';
                                    }, 100);
                                    setActive("Contact")
                                }}
                                className={`${active === 'Contact' ? 'transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500' : 'hover:text-green-500 cursor-pointer'} py-2 px-4 rounded-md`}
                            >
                                Contact
                            </a>
                            <Link to={"/profile/course"}>
                                <li
                                    onClick={() => setActive("Profile")}
                                    className={`${active === "Profile" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500" : "hover:text-green-500 cursor-pointer"} py-2 px-4 rounded-md`}
                                >
                                    Profile
                                </li>
                            </Link>

                        </ul>
                        <div className='flex flex-col gap-3 mt-6'>
                            {
                                user ?
                                    <div className='flex flex-col gap-3'>
                                        <Button variant="outline" className="text-gray-800 dark:text-white hover:bg-gray-200">LogOut</Button>
                                        {
                                            user?.role === "instructor" ?
                                                <Button onClick={() => navigate("/admin/dashboard")} className="bg-red-600 hover:bg-red-500">DashBoard</Button> : <></>
                                        }
                                    </div>
                                    :
                                    <Button onClick={() => navigate("/auth")} className="text-sm bg-orange-400 hover:bg-orange-500 text-white">Login/Register</Button>
                            }
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar
