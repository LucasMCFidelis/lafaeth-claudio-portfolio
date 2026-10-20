import "server-only";

import { HydrationBoundary, type QueryKey } from "@tanstack/react-query";

import { dehydrate } from "@/lib/hydrate";

export type PrefetchQuery = {
  /** Same key the client hook uses (from src/queries). */
  queryKey: QueryKey;
  /** Server read for that key, usually a function from src/app/data. */
  fetcher: () => Promise<unknown>;
};

interface PrefetchBoundaryProps {
  queries: Array<PrefetchQuery>;
  /**
   * Cache tags of the data, when every fetcher is a "use cache" read. Lets the
   * result be part of the static shell. Leave empty for request-time data.
   */
  tags?: Array<string>;
  children: React.ReactNode;
}

/**
 * Fetches the queries on the server, in parallel, and hands them to React
 * Query, so client components render with data and do not refetch on mount.
 * Render it inside <Suspense> with a fallback.
 */
const PrefetchBoundary = async ({
  queries,
  tags,
  children,
}: PrefetchBoundaryProps) => {
  const data = await Promise.all(queries.map((query) => query.fetcher()));

  const state = await dehydrate(
    queries.map((query, i) => ({ queryKey: query.queryKey, data: data[i] })),
    { tags }
  );

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
};

export default PrefetchBoundary;
