import { ProjectDTO } from "@/app/data/project/project-dto";
import { formatProjectPeriod } from "@/helpers/format-project-period";

interface ProjectHeaderProps {
  project: ProjectDTO;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { title, projectType, startDate, endDate, description } = project;

  return (
    <header className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-52">
      <div className="flex flex-col gap-6">
        <h1 className="font-heading text-3xl md:text-5xl leading-tight">
          {title}
        </h1>
        <dl className="flex flex-col gap-4">
          {projectType && (
            <div>
              <dt className="font-heading text-lg">Tipo de projeto</dt>
              <dd className="text-muted-foreground">{projectType}</dd>
            </div>
          )}
          <div>
            <dt className="font-heading text-lg">Data</dt>
            <dd className="text-muted-foreground">
              {formatProjectPeriod(startDate, endDate)}
            </dd>
          </div>
        </dl>
      </div>
      <p className="whitespace-pre-line md:pt-2">{description}</p>
    </header>
  );
};

export default ProjectHeader;
