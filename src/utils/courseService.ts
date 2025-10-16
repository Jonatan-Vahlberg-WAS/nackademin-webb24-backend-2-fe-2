

class CourseService {
    baseUrl: string;
    courseUrl: string;
    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.courseUrl = `${this.baseUrl}/courses`
    }

    async getCourses(options: Partial<CourseListQuery> = {}) {
       let url = `${this.courseUrl}/`
       if(options.offset) {
        url += `?offset=${options.offset}`
       }
        return await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }) 
    }

    async getCourse(id: number | string) {
       let url = `${this.courseUrl}/${id}/`
        return await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }) 
    }

    async createCourse(courseData: Partial<Course>) {
        const url = `${this.courseUrl}/`
        return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(courseData)
      })
    }

    async updateCourse(id: number | string, courseData: Partial<Course>) {
        const url = `${this.courseUrl}/${id}`
        return await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(courseData)
      })
    }

    async deleteCourse(id: number | string) {
        const url = `${this.courseUrl}/${id}`
        return await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
}

export default CourseService