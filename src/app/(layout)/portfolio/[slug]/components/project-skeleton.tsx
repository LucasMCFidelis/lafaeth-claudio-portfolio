const ProjectSkeleton = () => {
  return (
    <div
      aria-busy
      aria-label="Carregando"
      className="flex flex-col gap-10 w-11/12 mx-auto"
    >
      {/* Same grid as ProjectHeader. */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-52">
        <div className="flex flex-col gap-6">
          <div className="shimmer h-9 w-3/4 md:h-15" />
          <div className="flex flex-col gap-4">
            <div className="shimmer h-13 w-1/2" />
            <div className="shimmer h-13 w-1/2" />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:pt-2">
          <div className="shimmer h-4" />
          <div className="shimmer h-4" />
          <div className="shimmer h-4" />
          <div className="shimmer h-4 w-2/3" />
        </div>
      </div>
      {/* The cover is as tall as the screen. */}
      <div className="shimmer h-svh w-full" />
      {/* Same columns as ProjectImagesColumns. */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex flex-1 flex-col gap-6">
          <div className="shimmer aspect-[16/10] w-full" />
          <div className="shimmer aspect-[16/10] w-full" />
        </div>
        <div className="hidden flex-1 flex-col gap-6 md:flex">
          <div className="shimmer aspect-[16/10] w-full" />
          <div className="shimmer aspect-[16/10] w-full" />
        </div>
      </div>
      {/* Same spacing as ProjectNavigation. */}
      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-between">
        <div className="shimmer h-12 w-48" />
        <div className="shimmer h-12 w-48" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;
