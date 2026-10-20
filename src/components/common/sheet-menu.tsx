import { Menu } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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
import ShowWhenLogged from "./show-when-logged";

const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="font-nav">
        <SheetHeader>
          <SheetTitle className="font-heading font-medium">Menu</SheetTitle>
        </SheetHeader>
        <div className="gap-2 flex flex-col items-start">
          <MenuItemsList />
          <Suspense fallback={null}>
            <ShowWhenLogged>
              <Link key={"/admin"} className="px-4" href={"/admin"}>
                Administração
              </Link>
            </ShowWhenLogged>
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <ShowWhenLogged>
            <SheetFooter>
              <LogoutButton typeComplexity="full" />
            </SheetFooter>
          </ShowWhenLogged>
        </Suspense>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
