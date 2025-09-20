import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import LogoutButton from "./logout-button";
import MenuItemsList from "./menu-items-list";
import SheetMenu from "./sheet-menu";
import ToggleTheme from "./toggle-theme";

const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <>
      <header className="w-full p-5 flex justify-between items-center">
        <Link href={"/"} className="px-0 font-extrabold text-2xl md:text-3xl">
          Lafaeth Claudio
        </Link>
        <nav className="gap-4 hidden lg:flex font-semibold items-baseline">
          <MenuItemsList />
          {session && (
            <Link key={"/admin"} className="px-4" href={"/admin"}>
              Administração
            </Link>
          )}
          <ToggleTheme />
          {session && <LogoutButton />}
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
