import { ImageDTO } from "@/app/data/image/image-dto";

import { ImageRegistrationDefaults } from "../../components/cadastre-image-modal";

export type FlatImageField = "frontImageId" | "backImageId";

interface FlatTextFields {
  title: string;
  description: string;
}

/**
 * Pre-fills the registration of one side of the flat (line or flat) with the
 * image already chosen for the other side, so title and credits are not typed
 * twice. Title and description fall back to what was typed in the flat form.
 */
export function getFlatImageDefaults(
  flat: FlatTextFields,
  otherImage: ImageDTO | null | undefined
): ImageRegistrationDefaults {
  return {
    title: otherImage?.title || flat.title,
    description: otherImage?.description || flat.description,
    artist: otherImage?.artist,
    screenwriter: otherImage?.screenwriter ?? undefined,
    colorist: otherImage?.colorist ?? undefined,
    horizontalPage: otherImage?.horizontalPage,
  };
}

/**
 * Flat fields that can be copied from the chosen image: only the ones still
 * empty, so nothing the user typed is overwritten.
 */
export function getEmptyFlatFieldsFromImage(
  flat: FlatTextFields,
  image: ImageDTO
): Partial<FlatTextFields> {
  const fields: Partial<FlatTextFields> = {};
  if (!flat.title.trim() && image.title) fields.title = image.title;
  if (!flat.description.trim() && image.description) {
    fields.description = image.description;
  }
  return fields;
}
