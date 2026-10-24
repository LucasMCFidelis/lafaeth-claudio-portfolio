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
      {/* Named so it stays still during page transitions (globals.css). */}
      <header
        className="w-full p-5 flex justify-between items-center lg:mb-6"
        style={{ viewTransitionName: "site-header" }}
      >
        <Link href={"/"} className="px-0 font-heading font-bold tracking-wider text-2xl md:text-3xl">
          Lafaeth Claudio
        </Link>
        <nav className="gap-4 hidden lg:flex font-nav items-center">
          <MenuItemsList />
          <Suspense fallback={null}>
            <ShowWhenLogged>
              <Link
                key={"/admin"}
                className="px-4 text-muted-foreground transition-colors hover:text-foreground"
                href={"/admin"}
              >
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
