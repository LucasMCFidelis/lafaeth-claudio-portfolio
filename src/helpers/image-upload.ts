/** Image formats the admin can upload, with the file extension saved in R2. */
export const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
} as const;

export type AcceptedImageType = keyof typeof ACCEPTED_IMAGE_TYPES;

export const ACCEPTED_IMAGE_TYPE_LIST = Object.keys(ACCEPTED_IMAGE_TYPES) as [
  AcceptedImageType,
  ...AcceptedImageType[],
];

export const isAcceptedImageType = (type: string): type is AcceptedImageType =>
  Object.hasOwn(ACCEPTED_IMAGE_TYPES, type);

/** The Next image optimizer reads source files up to 50 MB. */
export const MAX_IMAGE_UPLOAD_BYTES = 20 * 1024 * 1024;

/** Top level folder of the file in the bucket. */
export const IMAGE_FOLDERS = ["images", "projects", "profile"] as const;

export type ImageFolder = (typeof IMAGE_FOLDERS)[number];

/**
 * Uploaded files get a new random name, so they never change and can be
 * cached forever.
 */
export const IMAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";

export const imageUploadMessages = {
  invalidType: "Formato não aceito. Envie JPG, PNG, WebP, AVIF ou GIF.",
  tooLarge: "A imagem deve ter no máximo 20 MB.",
  empty: "O arquivo está vazio.",
};
