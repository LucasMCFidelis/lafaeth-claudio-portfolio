import { cn } from "@/lib/utils";

interface GridSkeletonProps {
  items?: number;
  className?: string;
  itemClassName?: string;
}

/** Loading placeholder for the image grids, used as a Suspense fallback. */
const GridSkeleton = ({
  items = 6,
  className,
  itemClassName,
}: GridSkeletonProps) => {
  return (
    <div
      aria-busy
      aria-label="Carregando"
      className={cn(
        "w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: items }, (_, i) => (
        <div
          key={i}
          className={cn(
            "shimmer aspect-[21/29.5] w-full rounded-xl",
            itemClassName
          )}
        />
      ))}
    </div>
  );
};

export default GridSkeleton;
