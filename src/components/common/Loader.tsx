"use client";

// import { Spinner } from "@/components/ui/spinner";

export function Loader() {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading news...</p>
        </div>
      </div>
    // <div className="flex justify-center items-center py-10">
    //   <Spinner className="h-8 w-8 text-primary" />
    // </div>
  );
}
