import { Star } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    return (
        <div className='p-4 bg-green-50 dark:bg-green-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div onClick={() => navigate(`/course-details/${course?._id}`)} className=''>
                <img
                    className='h-48 w-full object-cover rounded-lg'
                    src={course?.courseThumbnail || "/noThumbnail.jpg"}
                    alt="Course Thumbnail"
                />

                <h3 className='mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200'>{course?.title}</h3>
                <div className='mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300'>
                    <div className='flex gap-1'>
                        <img className='h-5 p-[1px] border border-emerald-600 w-5 rounded-full' src={course?.creator?.profilePic ? course?.creator?.profilePic : "https://static.vecteezy.com/system/resources/previews/026/960/361/original/cute-female-teacher-cartoon-character-free-png.png"} alt="" />
                        <p>{course?.creator?.firstName} {course?.creator?.lastName}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                        ))}
                    </div>
                </div>
                <p className='text-sm truncate text-gray-500 dark:text-gray-400 mt-2'>{course?.subTitle ? course?.subTitle : "No SubTitle"}</p>
                <p className='mt-3 text-sm font-bold text-blue-600 dark:text-blue-400'>Rs: {course?.coursePrice ? course.coursePrice : "0"}/-</p>
            </div>
            {/* <button className='mt-4 text-sm w-full py-2 bg-green-600 text-white rounded-lg transition-colors duration-300'>
                Enroll Now
            </button> */}
        </div>
    );
};

export default CourseCard;
