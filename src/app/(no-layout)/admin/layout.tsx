import getManyImages from "@/app/data/image/get-many-images";
import verifyUserLogged from "@/app/data/user/verify-user";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AllImagesProvider } from "@/providers/all-images-provider";

import AdminSidebar from "./components/admin-sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout also wraps /admin/auth, so it must not send the images to
  // visitors who are not logged in.
  const userLogged = await verifyUserLogged();
  const allImages = userLogged ? await getManyImages({}) : [];

  return (
    <SidebarProvider>
      <AllImagesProvider initialImages={allImages} enabled={userLogged}>
        <AdminSidebar />
        <div className="relative flex flex-1 w-full flex-col gap-6 p-5">
          <SidebarTrigger className="absolute size-9 m-2 top-0 left-0" />
          {children}
        </div>
      </AllImagesProvider>
    </SidebarProvider>
  );
}
