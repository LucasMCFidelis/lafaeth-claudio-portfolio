import Link from "next/link";
import { Suspense } from "react";

import LogoutButton from "./logout-button";
import MenuItemsList from "./menu-items-list";
import SheetMenu from "./sheet-menu";
import ShowWhenLogged from "./show-when-logged";
import ToggleTheme from "./toggle-theme";

const Header = () => {
  return (
    <>
      <header className="w-full p-5 flex justify-between items-center">
        <Link href={"/"} className="px-0 font-extrabold text-2xl md:text-3xl">
          Lafaeth Claudio
        </Link>
        <nav className="gap-4 hidden lg:flex font-semibold items-baseline">
          <MenuItemsList />
          <Suspense fallback={null}>
            <ShowWhenLogged>
              <Link key={"/admin"} className="px-4" href={"/admin"}>
                Administração
              </Link>
            </ShowWhenLogged>
          </Suspense>
          <ToggleTheme />
          <Suspense fallback={null}>
            <ShowWhenLogged>
              <LogoutButton />
            </ShowWhenLogged>
          </Suspense>
        </nav>

        <nav className="flex gap-4 lg:hidden">
          <ToggleTheme />
          <SheetMenu />
        </nav>
      </header>
    </>
  );
};

export default Header;
