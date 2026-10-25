export type ImageDTO = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  /** Version shown on the site. */
  imageUrl: string;
  /** Original file for download; null when imageUrl is already the original. */
  originalUrl: string | null;
  artist: string;
  screenwriter: string | null;
  colorist: string | null;
  horizontalPage: boolean;
  visibleInHome: boolean;
  index: number | null
} 
