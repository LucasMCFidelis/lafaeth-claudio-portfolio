"use client";

import Link from "next/link";
import { memo } from "react";

const menuItemsList: Array<{ label: string; href: string }> = [
  { label: "Início", href: "/" },
  { label: "Flat", href: "/flat" },
  { label: "Cores", href: "/cores" },
  { label: "Quadrinhos", href: "/quadrinhos" },
  // { label: "Ilustrações", href: "/ilustracoes" },
  // { label: "Portfólio", href: "/portfolio" },
];

function MenuItemsListComponent() {
  return (
    <>
      {menuItemsList.map((item) => (
        <Link key={item.href} className="px-4" href={item.href}>
          {item.label}
        </Link>
      ))}
    </>
  );
}

const MenuItemsList = memo(MenuItemsListComponent);
export default MenuItemsList;
