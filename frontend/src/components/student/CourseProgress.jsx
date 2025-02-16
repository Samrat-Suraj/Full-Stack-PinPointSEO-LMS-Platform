import { useGetCourseProgressQuery, useMarkAsCompletedMutation, useMarkAsUnCompletedMutation, useUpdateLectureProgressMutation } from '@/features/progressApi';
import { CircleCheck, CirclePlay } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const CourseProgress = () => {
    const params = useParams();
    const courseId = params.id;
    const [updateLectureProgress, { data: updateData, isSuccess: updateIsSuccess, error: UpdateError, isLoading: UpdateIsLoading }] = useUpdateLectureProgressMutation()
    const [markAsUnCompleted, { data: inCompleteData, isSuccess: inCompleteIsSuccess }] = useMarkAsUnCompletedMutation()
    const [markAsCompleted, { data: completeData, isSuccess: completeIsSuccess }] = useMarkAsCompletedMutation()
    const { data, isLoading, error, refetch } = useGetCourseProgressQuery(courseId);

    const [currentlecture, setCurrentLecture] = useState(null);
    const { courseDetails, completed, progress } = data?.data || {};
    const { title, lectures } = courseDetails || {};

    const handleLectureClick = (lecture) => {
        setCurrentLecture(lecture);
    };

    useEffect(() => {
        if (lectures) {
            setCurrentLecture(lectures[0]);
        }
    }, [data]);

    const isLectureCompleted = (lectureId) => {
        return progress.some((prog) => prog.lectureId === lectureId && prog.viewed === true);
    };

    const updateLectureProgressHandel = async (lectureId) => {
        await updateLectureProgress({ courseId, lectureId })
        refetch()
    }

    const handelCompleteCourse = async () => {
        markAsCompleted(courseId)
        refetch()
    }
    const handelInCompleteCourse = async () => {
        markAsUnCompleted(courseId)
        refetch()
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!courseDetails) {
        return <div>No course details available.</div>;
    }

    return (
        <div className="bg-green-50 dark:bg-green-900 dark:text-white p-6 w-full rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4 md:mb-0">{title}</h1>

                <button
                    onClick={completed ? handelInCompleteCourse : handelCompleteCourse}
                    className="p-2 text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                    aria-label={completed ? "Remove course completion" : "Mark course as complete"}
                >
                    {completed ? "Remove Complete" : "Check All Complete"}
                </button>

            </div>
            <div className="flex lg:flex-row flex-col items-start space-y-6 md:space-y-0 lg:space-x-8">
                <div className="flex-1">
                    <p className="text-green-700 dark:text-green-300 mb-2 p-2 bg-green-300 dark:bg-green-700 font-semibold rounded-sm">{`Lecture ${lectures?.findIndex((lec) => lec?._id === currentlecture?._id) + 1}: ${currentlecture?.leactureTitle}`}</p>
                    <div className="relative pb-[56.25%] lg:w-full w-[80vw] h-0 mt-8">
                        {currentlecture?.videoUrl ? (
                            <ReactPlayer
                                url={currentlecture?.videoUrl}
                                className="absolute top-0 left-0 w-screen h-full"
                                width="100%"
                                height="100%"
                                controls={true}
                                onPlay={() => updateLectureProgressHandel(currentlecture?._id)}
                            />
                        ) : (
                            <div className="text-center text-green-500 dark:text-green-300 font-semibold p-4">No video available for this lecture.</div>
                        )}
                    </div>
                </div>
                <div className="lg:flex-1 w-[80vw] md:mt-6">
                    <h1 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">Course Lectures</h1>
                    <div className="space-y-2">
                        {lectures?.map((lecture, index) => (
                            <div
                                key={index}
                                onClick={() => handleLectureClick(lecture)}
                                className={`flex cursor-pointer justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 ${currentlecture?._id === lecture?._id ? "bg-green-200 dark:bg-green-600" : ""}`}
                            >
                                <div className={`${isLectureCompleted(lecture?._id) ? "text-green-600 dark:text-green-300" : "text-gray-600 dark:text-gray-400"} flex items-center space-x-2`}>
                                    {isLectureCompleted(lecture?._id) ? (
                                        <CircleCheck size={20} />
                                    ) : (
                                        <CirclePlay size={20} />
                                    )}
                                    <p>Lecture {index + 1}: {lecture?.leactureTitle}</p>
                                </div>
                                {isLectureCompleted(lecture?._id) && (
                                    <p className="text-green-600 text-sm p-1 bg-green-100 dark:bg-green-700 dark:text-green-300">
                                        Completed
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;
