"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useImage } from "@/hooks/queries/use-image";

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) throw new Error("id is required");
  const { data: image } = useImage(id);

  return (
    <div className="w-full flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10 px-5">
      <div className="flex-1 relative">
        {image && (
          <Image
            src={image?.imageUrl}
            alt={"teste"}
            fill
            className="object-contain"
          />
        )}
      </div>
      <div className="font-sans">
        <h2 className="font-extrabold text-xl md:text-3xl ">{image?.title}</h2>
        <p>{image?.description}</p>
      </div>
    </div>
  );
}
