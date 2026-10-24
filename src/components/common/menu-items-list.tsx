"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

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

function MenuItemsListComponent() {
  const pathname = usePathname();

  return (
    <>
      {menuItemsList.map((item) => {
        const isActive = isActiveItem(pathname, item.href);
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

const MenuItemsList = memo(MenuItemsListComponent);
export default MenuItemsList;
