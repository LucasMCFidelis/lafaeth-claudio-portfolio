import Link from "next/link";

import MenuItemsList from "./menu-items-list";
import SheetMenu from "./sheet-menu";

const Header = () => {
  return (
    <>
      <header className="w-full p-5 flex justify-between items-center">
        <Link href={"/"} className="px-0 font-extrabold text-2xl md:text-3xl">
          Lafaeth Claudio
        </Link>
        <nav className="gap-4 hidden lg:flex font-semibold">
          <MenuItemsList />
        </nav>

        <nav className="flex lg:hidden">
          <SheetMenu />
        </nav>
      </header>
    </>
  );
};

export default Header;
