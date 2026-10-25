/**
 * Longest side (px) of the version shown on the site. The Next image
 * optimizer never serves anything wider than its biggest device size (3840),
 * so a larger file would only be heavier.
 */
export const DISPLAY_IMAGE_MAX_SIDE = 3840;

/** WebP quality (0 to 1): visually the same as the original for illustrations. */
export const DISPLAY_IMAGE_QUALITY = 0.9;

/** Formats worth converting. WebP/AVIF are already efficient and a GIF may be animated. */
const CONVERTIBLE_TYPES = ["image/jpeg", "image/png"];

/**
 * Creates the lighter WebP version of an image, in the browser, to be shown
 * on the site while the original stays available for download. Returns null
 * when the file should be used as it is: another format, a browser that
 * cannot encode WebP (Safari falls back to PNG), a file it cannot decode, or
 * a result that is not smaller than the original.
 */
export const createDisplayImage = async (file: File): Promise<File | null> => {
  if (!CONVERTIBLE_TYPES.includes(file.type)) return null;

  try {
    // Applies the EXIF orientation, like the browser does when showing it.
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      DISPLAY_IMAGE_MAX_SIDE / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", DISPLAY_IMAGE_QUALITY)
    );
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) {
      return null;
    }

    const name = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${name}.webp`, { type: "image/webp" });
  } catch {
    return null;
  }
};
