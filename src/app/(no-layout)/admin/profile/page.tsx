import { Suspense } from "react";

import getUserData from "@/app/data/user/get-user-data";

import UpdateUserForm from "./components/update-user-form";

const AdminProfilePage = async () => {
  const userData = await getUserData();

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <UpdateUserForm initialData={userData} />;
    </Suspense>
  );
};

export default AdminProfilePage;
