"use client";

import VisibilitySwitch from "@/app/(no-layout)/admin/components/visibility-switch";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { ProjectSummaryDTO } from "@/app/data/project/project-dto";
import { projectTable } from "@/db/schema";
import {
  useProjectsList,
  useVisibleProjects,
} from "@/hooks/queries/use-projects";

import ExpandItemButton from "./expand-item-button";
import ProjectCard from "./project-card";

type ProjectsListProps = {
  displayButtonOpenModal?: boolean;
} & (
  | { variant: "visible" }
  | { variant: "all"; orderBy?: OrderByCondition<typeof projectTable> }
);

const ProjectsList = (props: ProjectsListProps) =>
  props.variant === "visible" ? (
    <VisibleProjectsList {...props} />
  ) : (
    <AllProjectsList {...props} />
  );

const VisibleProjectsList = ({ displayButtonOpenModal }: ProjectsListProps) => {
  const { data: projects } = useVisibleProjects();

  return (
    <ProjectsGrid
      projects={projects}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllProjectsList = ({
  displayButtonOpenModal,
  ...props
}: ProjectsListProps) => {
  const { data: projects } = useProjectsList({
    orderBy: props.variant === "all" ? props.orderBy : undefined,
  });

  return (
    <ProjectsGrid
      projects={projects}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

interface ProjectsGridProps {
  projects: ProjectSummaryDTO[];
  displayButtonOpenModal?: boolean;
}

const ProjectsGrid = ({
  projects,
  displayButtonOpenModal,
}: ProjectsGridProps) => {
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
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          disableLink={displayButtonOpenModal}
        >
          {displayButtonOpenModal && (
            <>
              <VisibilitySwitch
                entity="project"
                id={project.id}
                visible={project.visibleInProjects}
              />
              <ExpandItemButton
                typeLink
                href={`/admin/portfolio/update?projectId=${project.id}`}
              />
            </>
          )}
        </ProjectCard>
      ))}
    </div>
  );
};

export default ProjectsList;
