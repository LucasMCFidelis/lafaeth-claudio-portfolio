import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Button } from "../ui/button";

const socialLinks: Array<{ href: string; img: string; alt?: string }> = [
  {
    href: "https://www.behance.net/lafaethcludio",
    img: "/behance.png",
    alt: "Behance",
  },
  {
    href: "https://www.instagram.com/lafaethclaudio/",
    img: "/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://lattes.cnpq.br/2094330076158828",
    img: "/lattes.png",
    alt: "Lattes",
  },
  {
    href: "https://wa.me/5583991729253?text=Olá,%20tenho%20interesse%20no%20seu%20portfólio",
    img: "/whatsapp.png",
    alt: "WhatsApp",
  },
];

function FooterComponent() {
  return (
    <footer className="flex w-full p-5 gap-2 justify-center">
      {socialLinks.map(({ href, img, alt }) => (
        <Button key={href} variant="ghost" size="icon" asChild>
          <Link href={href} target="_blank" className="relative">
            <Image fill src={img} alt={alt ?? ""} />
          </Link>
        </Button>
      ))}
    </footer>
  );
}

const Footer = memo(FooterComponent);
export default Footer;
