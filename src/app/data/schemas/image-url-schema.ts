import z from "zod";

import { isLegacyImageUrl, isR2Url } from "@/helpers/image-url";
import { matchUrlDrive } from "@/helpers/match-url-drive";

const message = "Envie uma imagem.";

/**
 * URL of an image saved in the database: a file uploaded to R2. Google Drive
 * and Wix links are still accepted so records created before the upload can
 * be saved unchanged, until scripts/migrate-images-to-r2.ts moves them.
 */
export const imageUrlSchema = z
  .string({ message })
  .trim()
  .max(255, "URL muito longa")
  .refine((val) => isR2Url(val) || isLegacyImageUrl(val), { message })
  .transform((val) => (isLegacyImageUrl(val) ? matchUrlDrive(val) : val));
