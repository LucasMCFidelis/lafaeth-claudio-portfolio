const ProjectSkeleton = () => {
  return (
    <div
      aria-busy
      aria-label="Carregando"
      className="flex flex-col gap-10 w-full max-w-6xl mx-auto"
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-6">
          <div className="shimmer h-12 w-3/4 rounded-xl" />
          <div className="shimmer h-24 w-1/2 rounded-xl" />
        </div>
        <div className="shimmer h-24 rounded-xl" />
      </div>
      <div className="shimmer aspect-[16/10] w-full rounded-xl" />
    </div>
  );
};

export default ProjectSkeleton;
