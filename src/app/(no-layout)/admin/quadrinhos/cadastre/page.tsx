import getManyImages from "@/app/data/image/get-many-images";

import CadastreComicForm from "../components/cadastre-comic-form";

const CadastreComicPage = async () => {
  const allImages = await getManyImages({});

  return <CadastreComicForm imagesToSelect={allImages} />;
};

export default CadastreComicPage;
