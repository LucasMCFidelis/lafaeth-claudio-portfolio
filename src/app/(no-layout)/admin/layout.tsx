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
      <div className="relative flex flex-1 w-full flex-col gap-6 p-5">
        <SidebarTrigger className="absolute size-9 m-2 top-0 left-0" />
        {children}
      </div>
    </SidebarProvider>
  );
}
