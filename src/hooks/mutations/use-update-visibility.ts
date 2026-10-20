"use client";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { updateVisibility } from "@/actions/update-visibility";
import { VisibilityEntity } from "@/app/data/schemas/update-visibility-schema";
import { colorsQueries } from "@/queries/colors";
import { comicsQueries } from "@/queries/comics";
import { flatsQueries } from "@/queries/flats";
import { illustrationsQueries } from "@/queries/illustrations";
import { imagesQueries } from "@/queries/images";

/** Root query key and DTO field of each entity. */
const targets: Record<VisibilityEntity, { root: QueryKey; field: string }> = {
  color: { root: colorsQueries.keys.all, field: "visibleInColors" },
  comic: { root: comicsQueries.keys.all, field: "visibleInComics" },
  flat: { root: flatsQueries.keys.all, field: "visibleInFlat" },
  illustration: {
    root: illustrationsQueries.keys.all,
    field: "visibleInIllustrations",
  },
  homeImage: { root: imagesQueries.keys.all, field: "visibleInHome" },
};

type WithId = { id: string } & Record<string, unknown>;

export const getUpdateVisibilityMutationKey = (entity: VisibilityEntity) =>
  ["update-visibility", entity] as const;

/**
 * Shows or hides an item. The switch flips right away in every cached list
 * (optimistic update) and goes back if the server refuses.
 */
export const useUpdateVisibility = (entity: VisibilityEntity) => {
  const queryClient = useQueryClient();
  const { root, field } = targets[entity];

  const setVisible = (id: string, visible: boolean) => (data: unknown) => {
    const update = (item: WithId) =>
      item.id === id ? { ...item, [field]: visible } : item;
    if (Array.isArray(data)) return (data as Array<WithId>).map(update);
    if (data && typeof data === "object" && "id" in data) {
      return update(data as WithId);
    }
    return data;
  };

  return useMutation({
    mutationKey: getUpdateVisibilityMutationKey(entity),
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) =>
      await updateVisibility({ entity, id, visible }),
    onMutate: async ({ id, visible }) => {
      await queryClient.cancelQueries({ queryKey: root });
      const previous = queryClient.getQueriesData({ queryKey: root });
      queryClient.setQueriesData({ queryKey: root }, setVisible(id, visible));
      return { previous };
    },
    onError: (_error, _variables, context) => {
      context?.previous.forEach(([queryKey, data]) =>
        queryClient.setQueryData(queryKey, data)
      );
    },
    onSettled: () => {
      // Visible lists and display order change on the server.
      queryClient.invalidateQueries({ queryKey: root });
    },
  });
};
