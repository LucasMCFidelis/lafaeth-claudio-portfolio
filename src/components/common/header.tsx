import Link from "next/link";

import MenuItemsList from "./menu-items-list";
import SheetMenu from "./sheet-menu";
import ToggleTheme from "./toggle-theme";

const Header = () => {
  return (
    <>
      <header className="w-full p-5 flex justify-between items-center">
        <Link href={"/"} className="px-0 font-extrabold text-2xl md:text-3xl">
          Lafaeth Claudio
        </Link>
        <nav className="gap-4 hidden lg:flex font-semibold">
          <MenuItemsList />
          <ToggleTheme/>
        </nav>

        <nav className="flex gap-4 lg:hidden">
          <ToggleTheme/>
          <SheetMenu />
        </nav>
      </header>
    </>
  );
};

export default Header;
