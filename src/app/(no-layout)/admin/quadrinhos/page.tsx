import getManyComics from "@/app/data/comics/get-many-comics";
import ComicsList from "@/components/common/comics-list";

const ComicsAdminPage = async () => {
  const comics = await getManyComics({
    withImage: true,
  });

  return (
    <div className="px-5 flex-1 flex flex-col mt-12">
      <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <ComicsList initialData={comics} withImage={true} />
      </div>
    </div>
  );
};

export default ComicsAdminPage;
