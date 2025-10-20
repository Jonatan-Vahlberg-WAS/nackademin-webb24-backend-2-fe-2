"use client"

import CourseForm from "@/components/courses/CourseForm";
import { useCourse } from "@/contexts/course";

export default function NewCourse() {
  const course = useCourse()

  const onCreate = async (courseData: Partial<Course>) => {
    course.actions.createCourse(courseData)
  }

  return (
    <div className="p-16">
      <CourseForm formTitle="Add New Course" onSave={onCreate}/>
    </div>
  );
}
