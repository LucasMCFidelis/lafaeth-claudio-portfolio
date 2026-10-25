import "server-only";

import { inArray, or } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable, projectImagesTable, userTable } from "@/db/schema";
import { isR2Url, r2KeyFromUrl } from "@/helpers/image-url";
import { deleteR2Objects } from "@/lib/r2";

/**
 * Deletes from R2 the files of these URLs that no row uses anymore, as the
 * shown version or as the original (images, project images and the profile
 * picture). URLs outside R2 are ignored. Call it after the row was deleted or
 * changed, inside after() so a failure never breaks the action; errors are
 * only logged.
 */
const deleteUnusedImageFiles = async (
  urls: Array<string | null | undefined>
) => {
  const r2Urls = [
    ...new Set(urls.filter((url): url is string => !!url && isR2Url(url))),
  ];
  if (r2Urls.length === 0) return;

  try {
    const [images, projectImages, users] = await Promise.all([
      db
        .select({
          url: imagesTable.imageUrl,
          originalUrl: imagesTable.originalUrl,
        })
        .from(imagesTable)
        .where(
          or(
            inArray(imagesTable.imageUrl, r2Urls),
            inArray(imagesTable.originalUrl, r2Urls)
          )
        ),
      db
        .select({
          url: projectImagesTable.imageUrl,
          originalUrl: projectImagesTable.originalUrl,
        })
        .from(projectImagesTable)
        .where(
          or(
            inArray(projectImagesTable.imageUrl, r2Urls),
            inArray(projectImagesTable.originalUrl, r2Urls)
          )
        ),
      db
        .select({ url: userTable.image })
        .from(userTable)
        .where(inArray(userTable.image, r2Urls)),
    ]);

    const inUse = new Set<string | null>();
    for (const row of [...images, ...projectImages]) {
      inUse.add(row.url);
      inUse.add(row.originalUrl);
    }
    for (const row of users) inUse.add(row.url);

    const unusedKeys = r2Urls
      .filter((url) => !inUse.has(url))
      .map((url) => r2KeyFromUrl(url))
      .filter((key): key is string => !!key);

    if (unusedKeys.length > 0) await deleteR2Objects(unusedKeys);
  } catch (error) {
    console.error("Could not delete unused image files from R2", error);
  }
};

export default deleteUnusedImageFiles;
