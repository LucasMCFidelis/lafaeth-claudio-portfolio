import { getAllImages } from "@/actions/get-all-images";
import getOneComicById from "@/app/data/comics/get-one-comic-by-id";

const UpdateComicPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ comicId: string }>;
}) => {
  const { comicId } = await searchParams;

  const [allImages, comic] = await Promise.all([
    getAllImages(),
    getOneComicById({ comicId }),
  ]);

  return (
    <div className="mt-12">
      <p>{comic.id}</p>
    </div>
  );
};

export default UpdateComicPage;
