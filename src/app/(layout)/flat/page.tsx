import getManyFlats from "@/app/data/flat/get-many-flats";

import FlatItem from "./components/flat-item";

const FlatPage = async () => {
  const flats = await getManyFlats({
    where: { field: "visibleInFlat", value: true },
    withImages: true,
  });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-5 sm:gap-10 items-center">
        {flats.map((flat) => (
          <FlatItem key={flat.id} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default FlatPage;
