"use client;"

import { UserProvider } from "@/contexts/user";
import { PropsWithChildren } from "react";


export function Providers({ children }: PropsWithChildren) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}