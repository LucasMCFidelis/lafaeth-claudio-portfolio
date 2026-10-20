import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

interface GridSkeletonProps {
  items?: number;
  className?: string;
}

/** Loading placeholder for the image grids, used as a Suspense fallback. */
const GridSkeleton = ({ items = 6, className }: GridSkeletonProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: items }, (_, i) => (
        <Skeleton key={i} className="aspect-square w-full rounded-xl" />
      ))}
    </div>
  );
};

export default GridSkeleton;
