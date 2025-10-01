import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AdminSidebar from "./components/admin-sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1 flex flex-col ">
        <SidebarTrigger className="size-9 m-2" />
        <div className="relative flex flex-1 w-full justify-center items-center flex-col gap-6 p-5">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
