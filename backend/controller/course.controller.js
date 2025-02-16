import cloudinary from "../config/cloudinary.js"
import Course from "../model/course.model.js"
import Leacture from "../model/lecture.model.js"
import User from "../model/user.model.js"
import DataUri from "../utils/DataUri.js"

export const createCourse = async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not Found" })
        }
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({ success: false, message: "Both Title And Category Are Required" })
        }

        const newCourse = new Course({
            title,
            category,
            creator: user._id
        })

        await newCourse.save()
        return res.status(200).json({ success: true, message: "Course Created Successfully With Basic Info", course: newCourse })
    } catch (error) {
        console.log("Error In AddCourse Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.user
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(400).json({ success: false, message: "No Course Found" })
        }

        return res.status(200).json({ success: true, courses })
    } catch (error) {
        console.log("Error In getCreatorCourses Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" })
        }
        const { title, description, coursePrice, subTitle, category, courseLevel } = req.body
        const courseThumbnail = req.file

        if (courseThumbnail) {
            if (course.courseThumbnail) {
                const oldPublicId = course.courseThumbnail.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(oldPublicId)
            }
            const fileUri = DataUri(courseThumbnail)
            const cloudResponse = await cloudinary.uploader.upload(fileUri)
            course.courseThumbnail = cloudResponse.secure_url
        }

        course.title = title || course.title
        course.description = description || course.description
        course.coursePrice = coursePrice || course.coursePrice
        course.subTitle = subTitle || course.subTitle
        course.category = category || course.category
        course.courseLevel = courseLevel || course.courseLevel
        await course.save()
        return res.status(200).json({ success: true, message: "Course Updated Success", course })
    } catch (error) {
        console.log("Error In editCourse Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const course = await Course.findById(courseId).populate({path : "creator" , select : "firstName lastName profilePic"})
        .populate("lectures")
        if (!course) {
            return res.status(400).json({ success: false, message: "No Course Found" })
        }
        return res.status(200).json({ success: true, course })

    } catch (error) {
        console.log("Error In getCourseById Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// export const getAllCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({})
//         if (!courses) {
//             return res.status(400).json({ success: false, message: "No Course Found" })
//         }
//         return res.status(200).json({ success: true, courses })
//     } catch (error) {
//         console.log("Error In getAllCourses Controller", error.message)
//         return res.status(500).json({ success: false, message: "Internal Server Error" })
//     }
// }
export const searchCourse = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error In searchCourse Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const createLecture = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" })
        }

        const { leactureTitle } = req.body
        if (!leactureTitle) {
            return res.status(400).json({ success: false, message: "Lecture Title Is Required" })
        }
        const newLecture = new Leacture({
            leactureTitle,
        })

        await Course.findByIdAndUpdate(course._id, { $push: { lectures: newLecture._id } })
        await newLecture.save()
        return res.status(200).json({ success: true, message: "Lecture Created Successfully", lecture: newLecture })
    } catch (error) {
        console.log("Error In createLecture Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId)
            .populate({ path: "lectures", select: "leactureTitle" });

        if (!course) {
            return res.status(400).json({ success: false, message: "No Course Found" });
        }

        if (!course.lectures || course.lectures.length === 0) {
            return res.status(400).json({ success: false, message: "No Lectures Found" });
        }
        return res.status(200).json({ success: true, lectures: course.lectures });
    } catch (error) {
        console.log("Error In getCourseLecture Controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const MediaUpload = async (req, res) => {
    try {
        const lectureId = req.params.lectureId;
        const videoUrl = req.file;

        if (!videoUrl) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const lecture = await Leacture.findById(lectureId);
        if (!lecture) {
            return res.status(400).json({ success: false, message: "Lecture Not Found" });
        }

        cloudinary.uploader.upload_stream({ resource_type: 'video' }, async (error, cloudResponse) => {
            if (error) {
                return res.status(500).json({ success: false, message: "Error uploading to Cloudinary", error: error.message });
            }
            lecture.videoUrl = cloudResponse.secure_url;
            lecture.publicId = cloudResponse.public_id
            await lecture.save();

            return res.status(200).json({ success: true, message: "Video uploaded successfully", lecture });
        }).end(videoUrl.buffer);

    } catch (error) {
        console.log("Error in MediaUpload Controller:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const editLecture = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const lectureId = req.params.lectureId
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" })
        }
        const lecture = await Leacture.findById(lectureId)
        if (!lecture) {
            return res.status(400).json({ success: false, message: "Lecture Not Found" })
        }

        if (!course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id)
            await course.save()
        }

        const { leactureTitle, isPreviewFree } = req.body
        lecture.leactureTitle = leactureTitle || lecture.leactureTitle
        lecture.isPreviewFree = isPreviewFree || lecture.isPreviewFree

        await lecture.save()
        return res.status(200).json({ success: true, message: "Edited Lecture Successfully", lecture })

    } catch (error) {
        console.log("Error In editLecture Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const lectureId = req.params.lectureId
        const courseId = req.params.courseId
        const lecture = await Leacture.findById(lectureId)
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" })
        }

        if (!lecture) {
            return res.status(400).json({ success: false, message: "Lecture Not Found" })
        }

        if (lecture.videoUrl || lecture.publicId) {
            await cloudinary.uploader.destroy(lecture.publicId)
        }

        await Leacture.findByIdAndDelete(lecture._id)
        await Course.findByIdAndUpdate(course._id, { $pull: { lectures: lecture._id } })
        return res.status(200).json({ success: true, message: "Lecture Removed Successfully" })
    } catch (error) {
        console.log("Error In removeLecture Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const lectureId = req.params.lectureId
        const lecture = await Leacture.findById(lectureId)
        if (!lecture) {
            return res.status(400).json({ success: false, message: "Lecture Not Found" })
        }
        return res.status(200).json({ success: true, lecture })

    } catch (error) {
        console.log("Error In getLectureById Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getPublishedCourse = async (_, res) => {
    try {
        const courses = await Course.find({isPubliced : true}).populate({path : "creator" , select : "profilePic firstName lastName" })
        if (!courses) {
            return res.status(400).json({ success: false, message: "No Course Found" })
        }
        return res.status(200).json({ success: true, courses })
    } catch (error) {
        console.log("Error In getPublishedCourse Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;  // Get the course ID from URL params
        const { publish } = req.query;    // Get the "publish" query parameter
        const course = await Course.findById(courseId);  // Find the course by ID
        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" });
        }
        // Set the course's "isPubliced" to true or false based on the "publish" query
        course.isPubliced = publish === "true";  // Convert the string "true" to a boolean
        await course.save();  // Save the updated course to the database

        const statusMessage = course.isPubliced ? "Published" : "UnPublished";  // Set a status message based on the boolean
        return res.status(200).json({ success: true, message: `Course Is ${statusMessage}`, course });

    } catch (error) {
        console.log("Error In togglePublishCourse Controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
