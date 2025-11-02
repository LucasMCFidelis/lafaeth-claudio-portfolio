import Link from "next/link";

import getManyColors from "@/app/data/colorization/get-many-colors";
import ColorsList from "@/components/common/colors-list";
import { Button } from "@/components/ui/button";

const ColorsAdminPage = async () => {
  const colors = await getManyColors({
    withImage: true,
  });

  return (
    <>
      <Link href={"/admin/cores/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Colorização
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <ColorsList
          displayButtonOpenModal
          initialData={colors}
          withImage={true}
        />
      </div>
    </>
  );
};

export default ColorsAdminPage;
