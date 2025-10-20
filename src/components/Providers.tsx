"use client;"

import { CourseProvider } from "@/contexts/course";
import { UserProvider } from "@/contexts/user";
import { PropsWithChildren } from "react";


export function Providers({ children }: PropsWithChildren) {
    return (
        <UserProvider>
            <CourseProvider>
                {children}
            </CourseProvider>
        </UserProvider>
    )
}