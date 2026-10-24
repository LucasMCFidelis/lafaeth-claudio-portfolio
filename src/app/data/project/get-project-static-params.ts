import "server-only";

import getVisibleProjectsCached from "./get-visible-projects";

const EMPTY_PLACEHOLDER = [{ slug: "sem-projetos" }];

const getProjectStaticParams = async () => {
  const projects = await getVisibleProjectsCached();
  if (projects.length === 0) return EMPTY_PLACEHOLDER;
  return projects.map(({ slug }) => ({ slug }));
};

export default getProjectStaticParams;
