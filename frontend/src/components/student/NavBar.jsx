import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Search, TreePalm } from 'lucide-react';
import SearchDialog from './SearchDialog';
import DarkMode from './DarkMode';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileSideBar from './MobileSideBar';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadUserQuery, useLoggOutUserMutation } from '@/features/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { user } = useSelector(store => store.auth)
    const [loggOutUser, { data, isSuccess, error, isLoading }] = useLoggOutUserMutation()
    const { data: userData, isLoading: userLoading, refetch } = useLoadUserQuery()
    const [active, setActive] = useState("Home");
    const navigate = useNavigate()

    const onClickLogOutHander = () => {
        loggOutUser()
    }

    useEffect(() => {
        if (isSuccess && data) {
            refetch()
            toast.success(data?.message)
            navigate("/auth")
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [data, isSuccess, error, isLoading, loggOutUser, userData, userLoading, user])

    return (
        <div id='' className='flex mt-4 mb-4 justify-between items-center'>
            <Link to={"/"}>
                <div className='flex gap-2 cursor-pointer items-center'>
                    {/* <img className='h-10 w-12' src="/logo.webp" alt="" /> */}
                    <TreePalm className='text-green-600' size={40} />
                    <div className='text-[2vw] font-semibold'>
                        <span className='text-green-500 font-bold'>P</span>inPointSE<span className='text-orange-400 font-bold'>O</span>
                    </div>
                </div>
            </Link>
            <ul className='lg:flex md:flex hidden gap-6 items-center text-gray-500'>
                <a href='/' onClick={() => setActive("Home")} className={`${active === "Home" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500 " : "hover:text-green-600  cursor-pointer "}`}>Home</a>
                <a href='#About' onClick={() => setActive("About")} className={`${active === "About" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500 " : "hover:text-green-600 cursor-pointer"}`}>About</a>
                <Link to={"/explore"}>
                    <a onClick={() => setActive("Course")} className={`${active === "Course" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500  " : "hover:text-green-600 cursor-pointer"}`}>Course</a>
                </Link>
                <a href='#Contact' onClick={() => setActive("Contact")} className={`${active === "Contact" ? "transition-all duration-200 border-b-2 cursor-pointer border-green-500 text-green-500 " : "hover:text-green-600 cursor-pointer"}`}>Contact</a>
            </ul>
            <div className='lg:flex md:flex hidden items-center gap-4'>
                <SearchDialog />
                <DarkMode />
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer p-[2px] rounded-full border-green-500 border-2 w-9 h-9 hover:opacity-80 transition-opacity">
                                <AvatarImage className="rounded-full" src={user ? user?.profilePic : "https://github.com/shadcn.png"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mr-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                            <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                            <Link to={"/profile/course"}>
                                <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={onClickLogOutHander} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                Log Out
                            </DropdownMenuItem>
                            {user?.role === "instructor" && (
                                <>
                                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                                    <Link to={"/admin/dashboard"}>
                                        <DropdownMenuItem className="px-4 bg-red-600 text-white py-2 text-sm dark:text-gray-300 cursor-pointer">
                                            Dashboard
                                        </DropdownMenuItem>
                                    </Link>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button onClick={() => navigate("/auth")} className="rounded-full text-sm bg-orange-400 hover:bg-orange-500">
                        Login/Register
                    </Button>
                )}
            </div>
            <MobileSideBar />
        </div>
    );
};

export default NavBar;