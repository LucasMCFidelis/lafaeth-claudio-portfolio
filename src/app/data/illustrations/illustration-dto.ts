import { ImageDTO } from "../image/image-dto";

export type IllustrationDTO<WithImage extends boolean = true> = {
  id: string;
  imageId: string | null;
  redirectUrl: string | null;
  description: string | null;
  visibleInIllustrations: boolean;
  horizontalIllustration: boolean;
  index: number | null;
} & (WithImage extends true
  ? { image: ImageDTO | null }
  : { image?: ImageDTO | null });
