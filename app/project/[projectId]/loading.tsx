"use client";

import { useSearchParams } from "next/navigation";
import { ProjectDetailSkeleton } from "@/app/appComponents/projectDetails/ProjectSkeletons";

export default function ProjectLoading() {
  const params = useSearchParams();
  const deviceFromUrl = params.get("device") as
    | "website"
    | "mobile"
    | null;

  // Matches the canvas layout decision on the page once projectDetail loads.
  const isMobile = deviceFromUrl === "mobile";

  return <ProjectDetailSkeleton isMobile={isMobile} />;
}
