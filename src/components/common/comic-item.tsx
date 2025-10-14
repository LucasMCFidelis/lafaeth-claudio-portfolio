import Image from "next/image";
import Link from "next/link";

interface ComicItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  visibleInComics?: boolean;
}

const ComicItem = ({
  imageId,
  imageUrl,
  title,
  visibleInComics,
}: ComicItemProps) => {
  return (
    <Link href={`/gallery/quadrinhos?id=${imageId}`}>
      <div
        className={`relative aspect-[21/29.5]  ${
          !visibleInComics && "opacity-50"
        }`}
      >
        <Image
          src={imageUrl}
          alt={title || "Comic"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-20 bg-primary/70 text-primary-foreground flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-1000 ease-in-out font-semibold">
          <p className="first-letter:uppercase">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ComicItem;
