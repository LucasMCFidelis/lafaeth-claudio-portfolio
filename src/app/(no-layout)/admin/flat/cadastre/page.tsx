import getManyImages from "@/app/data/image/get-many-images";

import CadastreFlatForm from "../components/cadastre-flat-form";

const CadastreFlatPage = async () => {
  const allImages = await getManyImages({});

  return <CadastreFlatForm imagesToSelect={allImages} />;
};

export default CadastreFlatPage;
