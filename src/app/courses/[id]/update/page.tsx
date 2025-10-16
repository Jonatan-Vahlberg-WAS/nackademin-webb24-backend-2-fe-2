import UpdateCourse from "@/components/courses/UpdateCourse";
import CourseService from "@/utils/courseService";
import { notFound } from "next/navigation";

export default async function UpdateCoursePage({params}: PageProps<"/courses/[id]/update">) {
    const { id } = await params
    try {

      const response = await new CourseService().getCourse(id)
      
      if(!response.ok) {
        throw new Error("Course not found")
      }
      const course: Course | null = await response.json()
      if(!course) {
        throw new Error("Course not found")
      }
      return (
        <UpdateCourse course={course}/>
      );
    } catch(err) {
      return notFound()
    } 
}
