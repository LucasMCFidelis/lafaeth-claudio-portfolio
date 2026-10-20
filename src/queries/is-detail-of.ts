import { QueryKey } from "@tanstack/react-query";

/** True for a `[entity, "detail", id]` key (see the contracts in src/queries). */
export const isDetailOf = (queryKey: QueryKey, id: string) =>
  queryKey[1] === "detail" && queryKey[2] === id;
