"use client";

import { useUser } from "@/contexts/user";
import Link from "next/link"

export default function NewCourseLink() {
    const user = useUser()
    if(!user.user) {
        return null
    }
    return (
        <Link href={"/courses/new"}>
        Skapa ny Kurs
      </Link>
    )
} 