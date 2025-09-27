import { ImageDTO } from "../image/image-dto";

export type FlatDTO<WithImages extends boolean = true> = {
  id: string;
  title: string;
  description: string;
  frontImageId: string | null;
  backImageId: string | null;
  artist: string;
  screenwriter: string | null;
  horizontalPage: boolean;
  visibleInFlat: boolean;

  frontImage?: ImageDTO | null;
  backImage?: ImageDTO | null;
} & (WithImages extends true
  ? {
      frontImage: ImageDTO | null;
      backImage: ImageDTO | null;
    }
  : {
      frontImage?: ImageDTO | null;
      backImage?: ImageDTO | null;
    });
