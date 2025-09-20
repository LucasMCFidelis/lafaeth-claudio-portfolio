import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import MenuItemsList from "./menu-items-list";

const SheetMenu = () => {
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
