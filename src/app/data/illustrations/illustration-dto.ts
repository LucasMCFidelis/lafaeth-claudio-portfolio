import { ImageDTO } from "../image/image-dto";

export type IllustrationDTO<WithImage extends boolean = true> = {
  id: string;
  imageId: string | null;
  redirectUrl: string | null;
  description: string | null;
  visibleInIllustrations: boolean;
  /** Orientation chosen for the illustration; null follows the image. */
  horizontalOverride: boolean | null;
  /** Orientation shown in the grid: the override, or the image's horizontalPage. */
  horizontalIllustration: boolean;
  index: number | null;
} & (WithImage extends true
  ? { image: ImageDTO | null }
  : { image?: ImageDTO | null });
