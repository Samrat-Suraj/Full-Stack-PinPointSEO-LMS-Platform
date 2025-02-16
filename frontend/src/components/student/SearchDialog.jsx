import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from 'lucide-react';
import { useGetAllCoursesQuery } from '@/features/courseApi';
import { useNavigate } from 'react-router-dom';

const SearchDialog = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const { data, isLoading } = useGetAllCoursesQuery()
    const [filterData, setFilterData] = useState(data?.courses)

    useEffect(() => {
        const search = data?.courses?.filter((course) => {
            if (!text) {
                return true
            } else {
                return course?.title?.toLowerCase().includes(text?.toLowerCase())
            }
        })
        setFilterData(search?.slice(0, 5))
    }, [text, data?.courses])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="p-2 dark:text-white rounded-full hover:bg-green-200 transition-colors">
                    <Search className="text-black dark:text-white cursor-pointer" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 rounded-lg overflow-hidden bg-gray-800 shadow-lg">
                <DialogHeader className="p-4 border-b border-green-300 bg-gray-700">
                    <DialogTitle className="flex gap-3 items-center text-green-400">
                        <Search className="text-green-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setText(e.target.value)}
                            className="w-full font-normal text-sm outline-none p-2 border-none bg-gray-700 focus:ring-0 focus:border-green-500 text-white"
                        />
                    </DialogTitle>
                </DialogHeader>
                <div className="p-2 space-y-2">
                    {
                        filterData?.length === 0 ? <p className='text-white font-semibold text-center p-2 bg-red-600' >No Search Result</p> :
                            filterData?.map((course) => (
                                <DialogDescription
                                    key={course?._id}
                                    onClick={()=> navigate(`/course-details/${course?._id}`)}
                                    className="cursor-pointer bg-gray-700 flex items-center gap-3 p-2 rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    <img
                                        className="h-8 w-14 rounded-md"
                                        src={course?.courseThumbnail ? course?.courseThumbnail : "/noThumbnail.jpg"}
                                        alt=""
                                    />
                                    <p className="text-sm font-light text-white">{course?.title}</p>
                                </DialogDescription>
                            ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
