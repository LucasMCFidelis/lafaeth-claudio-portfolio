import { Home, Image, Images, SkipBack } from "lucide-react";
import Link from "next/link";

import getUserData from "@/app/data/user/get-user-data";
import verifyUserLogged from "@/app/data/user/verify-user";
import ToggleTheme from "@/components/common/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Imagens",
    url: "/admin/images",
    icon: Images,
  },
  {
    title: "Flats",
    url: "/admin/flat",
    icon: Image,
  },
  {
    title: "Quadrinhos",
    url: "/admin/quadrinhos",
    icon: Image,
  },
];

const AdminSidebar = async () => {
  const [userLogged, userData] = await Promise.all([
    verifyUserLogged(),
    getUserData(),
  ]);

  if (!userLogged) return;

  return (
    <Sidebar className="text-sm font-sans">
      <SidebarHeader>
        <div className="flex justify-between">
          <Button variant={"ghost"} asChild>
            <Link href={"/"}>
              <SkipBack />
              Voltar
            </Link>
          </Button>
          <ToggleTheme />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Administrativo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton className="py-6" asChild>
          <a href={"/admin/profile"}>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={userData.image as string | undefined} />
                <AvatarFallback>
                  {userData.name.split(" ")?.[0]?.[0]}
                  {userData.name.split(" ")?.[1]?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{userData.name}</h3>
                <span className="text-muted-foreground block text-xs">
                  {userData.email}
                </span>
              </div>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
