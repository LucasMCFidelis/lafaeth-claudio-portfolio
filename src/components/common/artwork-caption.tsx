import { cn } from "@/lib/utils";

interface ArtworkCaptionProps {
  title: string;
  className?: string;
}

/**
 * Title over an artwork card: covers the image on hover; on touch screens,
 * where there is no hover, it stays visible as a strip at the bottom.
 */
const ArtworkCaption = ({ title, className }: ArtworkCaptionProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 flex items-center justify-center bg-primary/70 px-3 text-center font-semibold text-primary-foreground opacity-0 transition-opacity duration-300 ease-out hover:opacity-100",
        "touch:inset-x-0 touch:top-auto touch:bottom-0 touch:py-1.5 touch:text-sm touch:opacity-100",
        className
      )}
    >
      <p className="line-clamp-2 first-letter:uppercase">{title}</p>
    </div>
  );
};

export default ArtworkCaption;
