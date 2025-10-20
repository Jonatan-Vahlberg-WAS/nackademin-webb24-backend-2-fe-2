"use client";

import Link from "next/link";
import { useUser } from "@/contexts/user";
import { PropsWithChildren } from "react";

export default function PageWrapper({ children }: PropsWithChildren) {
  const user = useUser();

  if (user.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-600">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user.user && !user.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
        <p className="text-2xl font-semibold mb-3">Access Denied</p>
        <p className="text-gray-500 mb-6 text-center">
          You don’t have permission to view this page.  
        </p>
        <Link
          href="/home"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all duration-150"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
