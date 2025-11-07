export type GalleryBasicType = {
  id: string;
  title: string;
  imageUrl: string;
  redirectUrl?: string | null;
  description?: string | null;
  observations?: string | null;
  artist?: string | null;
  screenwriter?: string | null;
  colorist?: string | null;
  productionYear?: number | null;
  productionSizePages?: number | null;
};
