"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, Suspense } from "react";

import { cn } from "@/lib/utils";

const menuItemsList: Array<{ label: string; href: string }> = [
  { label: "Início", href: "/" },
  { label: "Flat", href: "/flat" },
  { label: "Cores", href: "/cores" },
  { label: "Quadrinhos", href: "/quadrinhos" },
  { label: "Ilustrações", href: "/ilustracoes" },
  { label: "Portfólio", href: "/portfolio" },
];

const isActiveItem = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

/** Without a pathname (Suspense fallback) no item is highlighted. */
function MenuLinks({ pathname }: { pathname?: string }) {
  return (
    <>
      {menuItemsList.map((item) => {
        const isActive = !!pathname && isActiveItem(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "px-4 transition-colors hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

function ActiveMenuLinks() {
  return <MenuLinks pathname={usePathname()} />;
}

// usePathname suspends on routes whose params are only known at request
// time (e.g. /portfolio/preview/[id]); the boundary keeps the build passing.
// On the other routes the pathname is known when prerendering.
function MenuItemsListComponent() {
  return (
    <Suspense fallback={<MenuLinks />}>
      <ActiveMenuLinks />
    </Suspense>
  );
}

const MenuItemsList = memo(MenuItemsListComponent);
export default MenuItemsList;
