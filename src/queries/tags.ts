/**
 * Server cache tags (cacheTag/updateTag). Kept free of imports so the data
 * layer, the server actions and the query contracts can all share them.
 *
 * Every cached list that embeds image data is also tagged with `images`, so
 * updateTag(cacheTags.images) refreshes all of them after an image changes.
 */
export const cacheTags = {
  colors: "colors",
  comics: "comics",
  flats: "flats",
  illustrations: "illustrations",
  images: "images",
  user: "user",
} as const;
