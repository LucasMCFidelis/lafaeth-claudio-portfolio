import "server-only";

import {
  defaultShouldDehydrateQuery,
  type DehydratedState,
  QueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { cacheLife, cacheTag } from "next/cache";

export type HydratedQuery = {
  queryKey: QueryKey;
  data: unknown;
};

/**
 * Time the cached data was produced. Cached with the same tags as the data,
 * so both advance together when a write calls updateTag().
 */
const getHydrationUpdatedAt = async (tags: Array<string>) => {
  "use cache";
  cacheTag(...tags);
  cacheLife("max");
  return Date.now();
};

/**
 * Builds the HydrationBoundary state by hand. TanStack's dehydrate() reads
 * Date.now(), which breaks prerendering with Cache Components.
 *
 * - With `tags`: the data comes from "use cache" reads, so the timestamp is
 *   cached with the same tags and the result can be part of the static shell.
 * - Without `tags`: request-time data (admin), stamped with the current time.
 */
export const dehydrate = async (
  queries: Array<HydratedQuery>,
  options: { tags?: Array<string> } = {}
): Promise<DehydratedState> => {
  const updatedAt = options.tags?.length
    ? await getHydrationUpdatedAt(options.tags)
    : Date.now();

  const queryClient = new QueryClient();
  for (const query of queries) {
    queryClient.setQueryData(query.queryKey, query.data, { updatedAt });
  }

  return {
    mutations: [],
    queries: queryClient
      .getQueryCache()
      .getAll()
      .filter((query) => defaultShouldDehydrateQuery(query))
      .map((query) => ({
        dehydratedAt: updatedAt,
        queryHash: query.queryHash,
        queryKey: query.queryKey,
        state: query.state,
        ...(query.meta ? { meta: query.meta } : {}),
      })),
  };
};
