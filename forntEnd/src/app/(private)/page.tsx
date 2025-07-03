import Announcements from "@/components/Announcements/Announcements";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { cookies } from "next/headers";
import { Suspense } from "react";
export default async function HomePage() {
  const token = (await cookies()).get("authToken")?.value;
    
  return (
    <Suspense fallback={<SkeletonLoader />}>
        <Announcements token={token} />
    </Suspense>
  );
}
