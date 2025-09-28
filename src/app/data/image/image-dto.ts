export type ImageDTO = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrl: string;
  artist: string;
  screenwriter: string | null;
  colorist: string | null;
  horizontalPage: boolean;
  visibleInHome: boolean;
  indexInHome: number | null
} 
