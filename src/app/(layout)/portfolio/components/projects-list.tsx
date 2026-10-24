"use client";

import { useVisibleProjects } from "@/hooks/queries/use-projects";

import ProjectCard from "./project-card";

const ProjectsList = () => {
  const { data: projects } = useVisibleProjects();

  if (projects.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Nenhum projeto publicado ainda.
      </p>
    );
  }

  return (
    <div className="grid w-full max-w-4xl xl:max-w-full mx-auto gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectsList;
