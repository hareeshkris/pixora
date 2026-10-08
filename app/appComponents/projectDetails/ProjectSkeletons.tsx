import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { cn } from "cn";
import {
  CANVAS_TRANSFORM,
  getCanvasLayout,
  getScreenX,
  type CanvasLayout,
} from "./canvasLayout";

type ScreenSkeletonProps = {
  width?: number | string;
  height?: number | string;
  screenName?: string;
  isMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function ScreenSkeleton({
  width = 400,
  height = 820,
  screenName,
  isMobile = false,
  className,
  style,
}: ScreenSkeletonProps) {
  return (
    <div
      role="status"
      aria-label={screenName ? `Loading ${screenName}` : "Loading screen"}
      aria-busy="true"
      style={{ width, height, ...style }}
      className={cn(
        "skeleton-shine relative shrink-0 overflow-hidden bg-white",
        className
      )}
    >
      <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-gray-300" />
          <span className="size-2 rounded-full bg-gray-300" />
          <span className="size-2 rounded-full bg-gray-300" />
        </div>
        <Skeleton className="h-2 w-16 !rounded-full" />
      </div>
      <div className="flex h-[calc(100%-36px)] flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-6 w-14" />
            {!isMobile && <Skeleton className="h-7 w-20 rounded-full" />}
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="mt-1 h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <div className="mt-2 flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
        <div className={cn("mt-2 grid flex-1 gap-3", isMobile ? "grid-cols-1" : "grid-cols-3")}>
          {(isMobile ? [0, 1] : [0, 1, 2]).map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="min-h-24 w-full flex-1 !rounded-lg" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 pt-1 text-xs font-medium text-gray-500">
          <Loader2 className="size-3.5 animate-spin text-gray-400" />
          <span className="truncate">{screenName ? `Generating ${screenName}…` : "Generating screen…"}</span>
        </div>
      </div>
    </div>
  );
}

export function CanvasSkeleton({ count = 2, isMobile = false, layout }: { count?: number; isMobile?: boolean; layout?: CanvasLayout }) {
  const resolved = layout ?? getCanvasLayout(isMobile);
  const totalWidth = count * resolved.screenWidth + Math.max(count - 1, 0) * resolved.gap;
  return (
    <div role="status" aria-label="Loading screens" className="relative" style={{ width: totalWidth, height: resolved.screenHeight }}>
      {Array.from({ length: count }).map((_, i) => (
        <ScreenSkeleton
          key={i}
          width={resolved.screenWidth}
          height={resolved.screenHeight}
          isMobile={resolved.isMobile}
          screenName={count > 1 ? `Screen ${i + 1}` : undefined}
          className="absolute left-0 top-0"
          style={{ left: getScreenX(i, resolved) }}
        />
      ))}
    </div>
  );
}

export function CanvasSkeletonViewport({ count = 2, isMobile = false, layout }: { count?: number; isMobile?: boolean; layout?: CanvasLayout }) {
  const resolved = layout ?? getCanvasLayout(isMobile);
  const viewportCount = resolved.isMobile ? 1 : 2;

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className="origin-top-left"
        style={{ transform: `translate(${CANVAS_TRANSFORM.initialPositionX}px, ${CANVAS_TRANSFORM.initialPositionY}px) scale(${CANVAS_TRANSFORM.initialScale})` }}
      >
        <CanvasSkeleton count={viewportCount} isMobile={resolved.isMobile} layout={resolved} />
      </div>
    </div>
  );
}

export function ProjectDetailSkeleton({ screenCount = 2, isMobile = false, layout }: { screenCount?: number; isMobile?: boolean; layout?: CanvasLayout }) {
  const resolved = layout ?? getCanvasLayout(isMobile);
  return (
    <div role="status" aria-label="Loading project" className="w-full flex flex-col gap-0">
      <div className="w-full bg-white py-2">
        <div className="mx-auto px-10">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex items-start gap-0">
        <div className="hidden min-h-[calc(100vh-49px)] w-[280px] shrink-0 flex-col gap-4 border-r border-t border-gray-200 bg-white p-5 sm:flex">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-full !rounded-sm" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="min-h-32 w-full !rounded-sm" />
            <Skeleton className="h-8 w-full rounded-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-md border border-gray-100 px-2 py-2">
                <Skeleton className="h-3 w-20" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="size-7 !rounded-full" />
                  <Skeleton className="size-7 !rounded-full" />
                  <Skeleton className="size-7 !rounded-full" />
                  <Skeleton className="size-7 !rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="mb-10 flex gap-1.5">
            <Skeleton className="h-9 flex-1 rounded-sm" />
            <Skeleton className="h-9 flex-1 rounded-sm" />
          </div>
        </div>
        <div
          className="flex-1 bg-gray-200 h-[calc(100vh-49px)] overflow-hidden"
          style={{ backgroundImage: "radial-gradient(circle at center, #ccc 1px, transparent 0)", backgroundSize: "20px 20px" }}
        >
          <CanvasSkeletonViewport count={screenCount} isMobile={isMobile} layout={resolved} />
        </div>
      </div>
      <span className="sr-only">Loading project…</span>
    </div>
  );
}
