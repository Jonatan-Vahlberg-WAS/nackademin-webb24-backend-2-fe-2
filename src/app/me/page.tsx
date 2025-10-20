"use client";

import PageWrapper from "@/components/PageWrapper";
import { useUser } from "@/contexts/user"

export default function MePage() {
    const user = useUser()
    return (
        <PageWrapper>
            <pre>
                {JSON.stringify(user.user)}
            </pre>
        </PageWrapper>
    )
}