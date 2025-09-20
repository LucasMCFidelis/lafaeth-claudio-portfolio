import Link from "next/link";

import verifyUser from "@/app/data/user/verify-user";

import LogoutButton from "./logout-button";
import MenuItemsList from "./menu-items-list";
import SheetMenu from "./sheet-menu";
import ToggleTheme from "./toggle-theme";

const Header = async () => {
  const userLogged = await verifyUser();

  return (
    <>
      <header className="w-full p-5 flex justify-between items-center">
        <Link href={"/"} className="px-0 font-extrabold text-2xl md:text-3xl">
          Lafaeth Claudio
        </Link>
        <nav className="gap-4 hidden lg:flex font-semibold items-baseline">
          <MenuItemsList />
          {userLogged && (
            <Link key={"/admin"} className="px-4" href={"/admin"}>
              Administração
            </Link>
          )}
          <ToggleTheme />
          {userLogged && <LogoutButton />}
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
