"use client";

import CourseService from "@/utils/courseService";
import CourseForm from "./CourseForm";
import { useRouter } from "next/navigation";

type UpdateCourseProps = {
    course: Course;
}

export default function UpdateCourse({course}: UpdateCourseProps) {
    const router = useRouter()

    const onUpdate = async (courseData: Partial<Course> ) => {
        try {
      const response = await new CourseService().updateCourse(course.course_id, courseData)
      if(!response.ok){
        throw new Error("Course could not be Updated")
      }
      const updatedCourse: Course = await response.json()
      router.refresh()

    } catch (err) {
      console.warn("Error in creating course", err)
    }
    }

    return (
        <div>
            <CourseForm formTitle="Update Course" onSave={onUpdate} course={course}/>
        </div>
    )
}