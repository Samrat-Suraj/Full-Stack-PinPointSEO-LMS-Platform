import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { Edit, Book } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useLoadUserQuery } from '@/features/authApi';

const ProfileSideBar = () => {
    const { data: userData, isLoading: userLoading } = useLoadUserQuery();
    const navigate = useNavigate();
    return (
        <div className='lg:w-[280px] md:w-[200px] w-[80px] h-screen border-r border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-gray-900 p-6 flex flex-col'>
            <div className='flex flex-col lg:items-center md:items-center space-y-4'>
                <Dialog>
                    <DialogTrigger>
                        <Avatar className="lg:h-[120px] lg:w-[120px] md:h-[120px] md:w-[120px] h-[40px] w-[40px] p-1 border-green-500 dark:border-green-600 border-2 shadow-lg">
                            <AvatarImage className="rounded-full" src={userData ? userData?.user?.profilePic : "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent className="p-4 w-[300px] bg-white dark:bg-gray-800">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Profile</DialogTitle>
                            <DialogDescription>
                                <div className='flex mt-7 justify-center'>
                                    <Avatar className="h-[220px] w-[220px] p-2 border-4 border-green-500 dark:border-green-600 rounded-full shadow-xl transition-all hover:scale-105">
                                        <AvatarImage className="rounded-full" src={userData ? userData?.user?.profilePic : "https://github.com/shadcn.png"} />
                                        <AvatarFallback className="text-2xl text-gray-600 dark:text-gray-300">CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className='text-center mt-6'>
                                    <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>{userData?.user?.firstName} {userData?.user?.lastName}</p>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>{userData?.user?.role}</p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <div className='text-center lg:flex md:flex flex-col hidden'>
                    <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>{userData?.user?.firstName} {userData?.user?.lastName}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{userData?.user?.role}</p>
                </div>
            </div>

            <div className='mt-6 flex text-sm flex-col space-y-3'>
                <button onClick={() => navigate("/profile/edit")} className='flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200'>
                    <Edit size={20} />
                    <span className='lg:flex md:flex hidden'>Update Profile</span>
                </button>
                <button onClick={() => navigate("/profile/course")} className='flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200'>
                    <Book size={20} />
                    <span className='lg:flex md:flex hidden'>My Courses</span>
                </button>
            </div>

            <div className="mt-auto text-center">
                <button className='text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition duration-200'>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfileSideBar;
