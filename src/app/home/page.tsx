import CourseList from "@/components/courses/CourseList";
import Pagination from "@/components/Pagination";
import CourseService from "@/utils/courseService";
import Link from "next/link";

export default async function Home({ searchParams}: {
  searchParams: Promise<{
    limit?: string;
    offset?: string;
  }>
}) {
  const {offset} = await searchParams
  const response = await new CourseService().getCourses({ offset: offset ? Number(offset) : undefined})
  const courses: PaginatedListResponse<Course>= await response.json()

  return (
    <div className="p-16">
      <h1 className="text-2xl font-bold">Kurser</h1>
      <CourseList courses={courses.data} />
      <Pagination list={courses} baseUrl="/home"/>
      <Link href={"/courses/new"}>
        Skapa ny Kurs
      </Link>
      {/* <CourseForm/> */}
    </div>
  );
}
