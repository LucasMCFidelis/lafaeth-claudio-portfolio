import getManyImages from "@/app/data/image/get-many-images";
import AllImageList from "@/components/common/all-image-list";

const ImagesPage = async () => {
  const images = await getManyImages({});

  return (
    <div className="mt-12">
      <AllImageList initialData={images} />
    </div>
  );
};

export default ImagesPage;
