import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProjectLinkDTO } from "@/app/data/project/project-dto";
import { cn } from "@/lib/utils";

interface ProjectNavigationProps {
  prev: ProjectLinkDTO | null;
  next: ProjectLinkDTO | null;
}

const ProjectNavigation = ({ prev, next }: ProjectNavigationProps) => {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Outros projetos"
      className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-between"
    >
      {prev && <NeighbourLink project={prev} direction="prev" />}
      {next && <NeighbourLink project={next} direction="next" />}
    </nav>
  );
};

interface NeighbourLinkProps {
  project: ProjectLinkDTO;
  direction: "prev" | "next";
}

const NeighbourLink = ({ project, direction }: NeighbourLinkProps) => {
  const isNext = direction === "next";
  const Icon = isNext ? ChevronRight : ChevronLeft;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      rel={direction}
      className={cn(
        "group flex items-center gap-3 sm:max-w-[45%]",
        isNext && "sm:ml-auto flex-row-reverse text-right"
      )}
    >
      <Icon className="size-6 shrink-0 transition-transform group-hover:scale-125" />
      <span className="flex flex-col">
        <span className="text-sm text-muted-foreground">
          {isNext ? "Próximo projeto" : "Projeto anterior"}
        </span>
        <span className="font-heading text-lg group-hover:underline">
          {project.title}
        </span>
      </span>
    </Link>
  );
};

export default ProjectNavigation;
