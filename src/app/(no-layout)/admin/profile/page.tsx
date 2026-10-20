import { Suspense } from "react";

import getUserData from "@/app/data/user/get-user-data";

import AdminOnly from "../components/admin-only";
import UpdateUserForm from "./components/update-user-form";

const AdminProfilePage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <ProfileForm />
      </AdminOnly>
    </Suspense>
  );
};

const ProfileForm = async () => {
  const userData = await getUserData();

  return <UpdateUserForm initialData={userData} />;
};

export default AdminProfilePage;
