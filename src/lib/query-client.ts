import { isServer, QueryClient } from "@tanstack/react-query";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Data hydrated from the server is fresh; avoid refetching on mount.
        staleTime: 60_000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined;

/** A new client per server render, one shared client in the browser. */
export const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
