import Image from "next/image";
import Link from "next/link";

interface IllustrationItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  horizontalIllustration: boolean;
  visibleInIllustrations?: boolean;
  disableLink?: boolean;
  children: React.ReactNode;
}

const IllustrationItem = ({
  imageId,
  imageUrl,
  title,
  visibleInIllustrations,
  horizontalIllustration,
  disableLink,
  children,
}: IllustrationItemProps) => {
  const content = (
    <div
      className={`relative ${!visibleInIllustrations && "opacity-50"} ${
        horizontalIllustration ? "aspect-[29.5/21]" : "aspect-[21/29.5]"
      }`}
    >
      <Image src={imageUrl} alt={title} fill className="object-contain" />
      <div className="absolute inset-0 z-20 bg-primary/70 text-primary-foreground flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-1000 ease-in-out font-semibold">
        <p className="first-letter:uppercase">{title}</p>
      </div>
      {children}
    </div>
  );

  if (disableLink) return content;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return <Link href={`/gallery/ilustracoes?id=${imageId}`}>{content}</Link>;
};

export default IllustrationItem;
