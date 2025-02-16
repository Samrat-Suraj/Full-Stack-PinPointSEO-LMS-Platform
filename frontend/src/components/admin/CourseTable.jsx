import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCoursesQuery } from '@/features/courseApi'

const CourseTable = () => {
    const [text, setText] = useState("")
    const { data, isLoading, refetch } = useGetCreatorCoursesQuery()

    const [filterdata, setFilterData] = useState(data?.courses)

    useEffect(() => {
        if (data?.courses) {
            const search = data.courses.filter((course) => {
                if (!text) {
                    return true;
                } else {
                    const lowerCaseText = text.toLowerCase();
                    return (
                        course?.title?.toLowerCase()?.includes(lowerCaseText) ||
                        (course?.coursePrice && course?.coursePrice.toString().includes(lowerCaseText))
                    );
                }
            });
            setFilterData(search);
        }
    }, [text, data?.courses]);

    useEffect(() => {
        refetch()
    }, [data, isLoading, refetch])

    const navigate = useNavigate()
    return (
        <div className="overflow-x-auto ml-1 p-4 rounded-lg bg-green-50 dark:bg-gray-800">
            <div>
                <input 
                    onChange={(e) => setText(e.target.value)} 
                    type="text" 
                    className='p-2 bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400 border rounded-lg outline-none text-sm' 
                    placeholder='Search By Title , Price' 
                />
            </div>
            <Table className="text-green-800 mt-2 dark:text-green-300">
                <TableCaption>A list of your recent Course Added.</TableCaption>
                <TableHeader className="bg-green-100 dark:bg-gray-700">
                    <TableRow>
                        <TableHead className="w-[200px] sm:w-[400px]">Title</TableHead>
                        <TableHead className="hidden sm:table-cell">Price</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    filterdata?.map((course) => {
                        return (
                            <TableBody key={course?._id}>
                                <TableRow className="hover:bg-green-200 dark:hover:bg-green-600">
                                    <TableCell className="font-medium text-sm">{course?.title}</TableCell>
                                    <TableCell className="text-sm hidden sm:table-cell">Rs:- {course?.coursePrice ? course?.coursePrice : "NA"}/-</TableCell>
                                    <TableCell className="text-sm hidden sm:table-cell">{course?.isPubliced ? "Publiced" : "Draft"}</TableCell>
                                    <TableCell onClick={() => navigate(`/admin/course/${course?._id}`)} className="text-right text-sm text-red-600 hidden sm:table-cell cursor-pointer">Edit</TableCell>
                                </TableRow>

                                {/* Mobile View */}
                                <TableRow className="sm:hidden mt-2 border-t border-gray-300 dark:border-gray-600">
                                    <TableCell className="font-medium text-sm">
                                        <strong>Title:</strong> {course?.title}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="sm:hidden border-t border-gray-300 dark:border-gray-600">
                                    <TableCell className="text-sm">
                                        <strong>Price:</strong> Rs:- {course?.coursePrice ? course?.coursePrice : "NA"}/-
                                    </TableCell>
                                </TableRow>
                                <TableRow className="sm:hidden border-t border-gray-300 dark:border-gray-600">
                                    <TableCell className="text-sm">
                                        <strong>Status:</strong> {course?.isPubliced ? "Publiced" : "Draft"}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="sm:hidden border-t border-gray-300 dark:border-gray-600">
                                    <TableCell onClick={() => navigate(`/admin/course/${course?._id}`)} className="text-sm text-green-600">
                                        <strong>Action:</strong> Edit
                                    </TableCell>
                                </TableRow>
                                <div className='h-[2px] lg:hidden md:hidden bg-green-500 w-full dark:bg-green-700'></div>
                            </TableBody>
                        )
                    })
                }
            </Table>
        </div>
    )
}

export default CourseTable
