export type ProjectImageDTO = {
  id: string;
  title: string;
  imageUrl: string;
};

export type ProjectSummaryDTO = {
  id: string;
  slug: string;
  title: string;
  cover: ProjectImageDTO | null;
};

export type ProjectDTO = ProjectSummaryDTO & {
  description: string;
  projectType: string | null;
  startDate: string;
  endDate: string | null;
  images: ProjectImageDTO[];
};

export type ProjectLinkDTO = {
  slug: string;
  title: string;
};

export type ProjectPageDTO = {
  project: ProjectDTO;
  prev: ProjectLinkDTO | null;
  next: ProjectLinkDTO | null;
};
