import getManyImages from "@/app/data/image/get-many-images";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AllImagesProvider } from "@/providers/all-images-provider";

import AdminSidebar from "./components/admin-sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allImages = await getManyImages({});

  return (
    <SidebarProvider>
      <AllImagesProvider initialImages={allImages}>
        <AdminSidebar />
        <div className="relative flex flex-1 w-full flex-col gap-6 p-5">
          <SidebarTrigger className="absolute size-9 m-2 top-0 left-0" />
          {children}
        </div>
      </AllImagesProvider>
    </SidebarProvider>
  );
}
