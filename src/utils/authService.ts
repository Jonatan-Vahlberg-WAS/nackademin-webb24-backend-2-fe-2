

class AuthService {
    private baseUrl: string;
    private authUrl: string;
    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.authUrl = `${this.baseUrl}/auth`
    }

    async login(email: string, password: string) {
       let url = `${this.authUrl}/login`
        return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email, password})
      }) 
    }

    async register(email: string, password: string) {
       let url = `${this.authUrl}/register`
        return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email, password})
      }) 
    }

    async getUserProfile() {
        const url = `${this.authUrl}/me`
        return await fetch(url,{
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
    })

    }
}

export default AuthService