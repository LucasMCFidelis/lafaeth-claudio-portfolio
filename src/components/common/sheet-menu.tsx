import { Menu } from "lucide-react";
import Link from "next/link";

import verifyUser from "@/app/data/user/verify-user";

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
  const userLogged = await verifyUser();

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
          {userLogged && (
            <Link key={"/admin"} className="px-4" href={"/admin"}>
              Administração
            </Link>
          )}
        </div>
        {userLogged && (
          <SheetFooter>
            <LogoutButton typeComplexity="full" />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
