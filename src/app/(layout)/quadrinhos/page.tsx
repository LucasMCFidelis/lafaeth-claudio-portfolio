import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import getManyComics from "@/app/data/comics/get-many-comics";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Quadrinhos",
  description:
    "Página dos projetos de quadrinhos no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de quadrinhos desenvolvidos pelo autor",
};

const ComicsPage = async () => {
  const comics = await getManyComics({
    where: { field: "visibleInComics", value: true },
    withImage: true,
  });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {comics
          .filter((comic) => comic.image)
          .map((comic) => (
            <Link key={comic.id} href={`/gallery/quadrinhos?id=${comic.image!.id}`}>
              <div className="relative aspect-[21/29.5]">
                <Image
                  src={comic.image!.imageUrl}
                  alt={comic.image!.title || "Comic"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 z-20 bg-primary/70 text-primary-foreground flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-1000 ease-in-out font-semibold">
                  <p className="first-letter:uppercase">{comic.image!.title}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ComicsPage;
