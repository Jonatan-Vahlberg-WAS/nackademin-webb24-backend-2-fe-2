"use client";

import CourseService from "@/utils/courseService"
import { useRouter } from "next/navigation"
import { createContext, PropsWithChildren, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "./user";



type CourseState = {
    actions: {
        createCourse: (courseData: Partial<Course>) => Promise<void>
    }
} 

const initialState: CourseState = {
    actions: {
        createCourse: () => Promise.resolve()
    }
}

const CourseContext = createContext(initialState)

function CourseProvider({children}: PropsWithChildren) {
    const router = useRouter()
    const user = useUser()

    const isUserLoggedIn = user.user!!

    const createCourse: typeof initialState.actions.createCourse = async (courseData) => {
    if(!isUserLoggedIn) {
        toast("You have to be logged in to create a course", { type: "info" })
        return
    }    
    console.log("CREATE NEW COURSE", courseData)
    try {
      const response = await new CourseService().createCourse(courseData)
      if(!response.ok){
        throw new Error("Course could not be created")
      }
      const newCourse: Course = await response.json()
      toast(`The course '${newCourse.title}' was created successfully`, {
            type: "success"
        })
      router.push(`/courses/${newCourse.course_id}/update/`)

    } catch (err) {
        toast("The course could not be created", {
            type: "error"
        })
      console.warn("Error in creating course", err)
    }
  }

    return (
        <CourseContext.Provider value={{
            actions: {
                createCourse
            }
        }}>
            {children}
            <ToastContainer/>
        </CourseContext.Provider>
    )
}

const useCourse = () => {
    const course = useContext(CourseContext)
    
    return course
}

export {
    CourseProvider,
    useCourse
}