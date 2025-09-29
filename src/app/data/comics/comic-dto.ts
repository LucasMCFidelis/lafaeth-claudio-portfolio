import { ImageDTO } from "../image/image-dto";

export type ComicDTO<WithImage extends boolean = true> = {
  id: string;
  imageId: string | null;
  productionYear: number;
  productionSizePages: number;
  visibleInComics: boolean;
  indexInComics: number | null;
} & (WithImage extends true
  ? { image: ImageDTO | null }
  : { image?: ImageDTO | null });
