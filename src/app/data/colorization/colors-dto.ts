import { ImageDTO } from "../image/image-dto";

export type ColorDTO<WithImage extends boolean = true> = {
  id: string;
  imageId: string | null;
  productionYear: number;
  observations: string | null;
  visibleInColors: boolean;
  index: number | null;
} & (WithImage extends true
  ? { image: ImageDTO | null }
  : { image?: ImageDTO | null });
