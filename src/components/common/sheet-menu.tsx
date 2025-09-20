import { Menu } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import LogoutButton from "./logout-button";
import MenuItemsList from "./menu-items-list";

const SheetMenu = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="font-semibold">
        <SheetHeader>
          <SheetTitle className="font-bold">Menu</SheetTitle>
        </SheetHeader>
        <div className="gap-2 flex flex-col items-start">
          <MenuItemsList />
          {session && (
            <Link key={"/admin"} className="px-4" href={"/admin"}>
              Administração
            </Link>
          )}
        </div>
        {session && (
          <SheetFooter>
            <LogoutButton typeComplexity="full" />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
