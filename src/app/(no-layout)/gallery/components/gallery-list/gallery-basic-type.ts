export type GalleryBasicType = {
  id: string;
  title: string;
  imageUrl: string;
  /** Original file for download; the button is hidden when missing. */
  originalUrl?: string | null;
  redirectUrl?: string | null;
  description?: string | null;
  observations?: string | null;
  artist?: string | null;
  screenwriter?: string | null;
  colorist?: string | null;
  productionYear?: number | null;
  productionSizePages?: number | null;
};
