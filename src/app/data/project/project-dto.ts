export type ProjectImageDTO = {
  id: string;
  title: string;
  /** Version shown on the site. */
  imageUrl: string;
  /** Original file for download; null when imageUrl is already the original. */
  originalUrl: string | null;
};

export type ProjectImageAdminDTO = ProjectImageDTO & {
  projectId: string;
  visibleInProject: boolean;
  index: number | null;
};

export type ProjectSummaryDTO = {
  id: string;
  slug: string;
  title: string;
  cover: ProjectImageDTO | null;
  visibleInProjects: boolean;
  index: number | null;
};

export type ProjectDTO = ProjectSummaryDTO & {
  description: string;
  projectType: string | null;
  /** Columns of the image grid on the project page (the cover is a banner). */
  imageColumns: 1 | 2;
  startDate: string;
  endDate: string | null;
  images: ProjectImageDTO[];
};

export type ProjectAdminDTO = Omit<ProjectDTO, "cover" | "images">;

export type ProjectLinkDTO = {
  slug: string;
  title: string;
};

export type ProjectPageDTO = {
  project: ProjectDTO;
  prev: ProjectLinkDTO | null;
  next: ProjectLinkDTO | null;
};
