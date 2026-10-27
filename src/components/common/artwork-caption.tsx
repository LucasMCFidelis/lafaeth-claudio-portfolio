import { ImageDTO } from "@/app/data/image/image-dto";
import { cn } from "@/lib/utils";

type ArtworkCredits = Pick<ImageDTO, "artist" | "screenwriter" | "colorist">;

interface ArtworkCaptionProps {
  title: string;
  credits?: ArtworkCredits;
  observation?: string | null;
  className?: string;
}

const ArtworkCaptionBase = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 flex flex-col gap-3 items-center justify-center bg-primary/70 px-3 text-center font-heading font-medium text-primary-foreground backdrop-blur-sm dark:bg-background/75 dark:text-foreground opacity-0 transition-opacity duration-300 ease-out hover:opacity-100",
        "touch:inset-x-0 touch:top-auto touch:bottom-0 touch:py-1.5 touch:text-sm touch:opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}

const Credits = ({ artist, screenwriter, colorist }: ArtworkCredits) => {
  const sameArtistAndColorist =
    !!artist && artist.toLowerCase() === (colorist ?? "").toLowerCase();

  return (
    <div className="flex flex-col text-sm font-normal">
      {screenwriter && <p className="capitalize">Roteiro: {screenwriter}</p>}
      {sameArtistAndColorist ? (
        <p>Arte e Cor: <span className="capitalize">{artist}</span></p>
      ) : (
        <>
          {artist && <p className="capitalize">Arte: {artist}</p>}
          {colorist && <p className="capitalize">Cor: {colorist}</p>}
        </>
      )}
    </div>
  );
};

/**
 * Title over an artwork card: covers the image on hover; on touch screens,
 * where there is no hover, it stays visible as a strip at the bottom.
 * Credits come from the list that renders the card (no fetch per card).
 */
const ArtworkCaption = ({ title, className, credits, observation }: ArtworkCaptionProps) => {
  return (
    <ArtworkCaptionBase className={className}>
      <p className="line-clamp-2 first-letter:uppercase">{title}</p>
      {credits && <Credits {...credits} />}
      {observation && (<p className="text-sm font-normal">{observation}</p>)}
    </ArtworkCaptionBase>
  );
};

export default ArtworkCaption;
