/** How many items use an image, by kind. */
export type ImageUsage = {
  colors: number;
  comics: number;
  flats: number;
  illustrations: number;
  banner: number;
};

export const emptyImageUsage = (): ImageUsage => ({
  colors: 0,
  comics: 0,
  flats: 0,
  illustrations: 0,
  banner: 0,
});

export const isImageInUse = (usage?: ImageUsage) =>
  !!usage && Object.values(usage).some((count) => count > 0);
