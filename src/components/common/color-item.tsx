import Image from "next/image";
import Link from "next/link";

interface ColorItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  visibleInColors?: boolean;
  horizontalPage: boolean;
  disableLink?: boolean;
  children: React.ReactNode;
}

const ColorItem = ({
  imageId,
  imageUrl,
  title,
  visibleInColors,
  horizontalPage,
  disableLink,
  children,
}: ColorItemProps) => {
  const content = (
    <div
      className={`relative ${!visibleInColors && "opacity-50"} ${
        horizontalPage ? "aspect-[29.5/21]" : "aspect-[21/29.5]"
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

  return <Link href={`/gallery/cores?id=${imageId}`}>{content}</Link>;
};

export default ColorItem;
