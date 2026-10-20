"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import {
  UpdateVisibilityDTO,
  updateVisibilitySchema,
} from "@/app/data/schemas/update-visibility-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import {
  colorizationTable,
  comicsTable,
  flatTable,
  illustrationsTable,
  imagesTable,
} from "@/db/schema";
import { cacheTags } from "@/queries/tags";

/**
 * Shows or hides an item on the public pages. Hiding also clears its
 * position, like the edit forms do, so it goes to the end when shown again.
 */
export const updateVisibility = async (data: UpdateVisibilityDTO) => {
  const { entity, id, visible } = updateVisibilitySchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const index = visible ? {} : { index: null };

  const updated = await (() => {
    switch (entity) {
      case "color":
        return db
          .update(colorizationTable)
          .set({ visibleInColorization: visible, ...index })
          .where(eq(colorizationTable.id, id))
          .returning({ id: colorizationTable.id });
      case "comic":
        return db
          .update(comicsTable)
          .set({ visibleInComics: visible, ...index })
          .where(eq(comicsTable.id, id))
          .returning({ id: comicsTable.id });
      case "flat":
        return db
          .update(flatTable)
          .set({ visibleInFlat: visible, ...index })
          .where(eq(flatTable.id, id))
          .returning({ id: flatTable.id });
      case "illustration":
        return db
          .update(illustrationsTable)
          .set({ visibleInIllustrations: visible, ...index })
          .where(eq(illustrationsTable.id, id))
          .returning({ id: illustrationsTable.id });
      case "homeImage":
        return db
          .update(imagesTable)
          .set({ visibleInHome: visible, ...index })
          .where(eq(imagesTable.id, id))
          .returning({ id: imagesTable.id });
    }
  })();

  if (updated.length === 0) throw new Error("Item not found");

  const tags = {
    color: cacheTags.colors,
    comic: cacheTags.comics,
    flat: cacheTags.flats,
    illustration: cacheTags.illustrations,
    homeImage: cacheTags.images,
  } as const;
  updateTag(tags[entity]);

  return { success: true };
};
