import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { db } from "@/db";
import { imagesTable, projectImagesTable } from "@/db/schema";
import { r2KeyFromUrl } from "@/helpers/image-url";
import { slugify } from "@/helpers/slugify";
import { createPresignedDownload } from "@/lib/r2";

/**
 * Download of the original file of an image (id of a row of images or of
 * project_images). Redirects to a signed R2 URL that lasts one minute and
 * makes the browser save the file. The originals are as public as the images
 * shown on the site; the id is only used to find them.
 */
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/download/[id]">
) {
  const parsed = z.uuid().safeParse((await ctx.params).id);
  if (!parsed.success) return new NextResponse(null, { status: 404 });
  const id = parsed.data;

  const [image] = await db
    .select({ title: imagesTable.title, originalUrl: imagesTable.originalUrl })
    .from(imagesTable)
    .where(eq(imagesTable.id, id));

  const [projectImage] = image
    ? []
    : await db
        .select({
          title: projectImagesTable.title,
          originalUrl: projectImagesTable.originalUrl,
        })
        .from(projectImagesTable)
        .where(eq(projectImagesTable.id, id));

  const found = image ?? projectImage;
  const key = found?.originalUrl ? r2KeyFromUrl(found.originalUrl) : null;
  if (!found || !key) return new NextResponse(null, { status: 404 });

  const extension = key.split(".").at(-1);
  const filename = `${slugify(found.title) || "imagem"}.${extension}`;
  const url = await createPresignedDownload({ key, filename });

  const response = NextResponse.redirect(url, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
