import getUserData from "@/app/data/user/get-user-data";

import UpdateUserForm from "./components/update-user-form";

const AdminProfilePage = async () => {
  const userData = await getUserData();

  return <UpdateUserForm initialData={userData} />;
};

export default AdminProfilePage;
