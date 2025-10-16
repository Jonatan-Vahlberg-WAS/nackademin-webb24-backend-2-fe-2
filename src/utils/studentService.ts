

class StudentService {
    baseUrl: string;
    studentUrl: string;
    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.studentUrl = `${this.baseUrl}/students`
    }
    
    async getStudents(options: Partial<StudentListQuery> = {}) {
       let url = `${this.studentUrl}/`
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
    
    async getStudent(id: number | string) {
       let url = `${this.studentUrl}/${id}/`
        return await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }) 
    }

    async createStudent(studentData: Partial<Student>) {
        const url = `${this.studentUrl}/`
        return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      })
    }

    async updateStudent(id: number | string, studentData: Partial<Student>) {
        const url = `${this.studentUrl}/${id}`
        return await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      })
    }

    async deleteStudent(id: number | string) {
        const url = `${this.studentUrl}/${id}`
        return await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
}

export default StudentService