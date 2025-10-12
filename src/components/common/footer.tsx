import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import getUserMediaData from "@/app/data/user/get-user-medias-data";

import { Button } from "../ui/button";

async function FooterComponent() {
  const mediasUrls = await getUserMediaData();
  const socialLinks: Array<{ href: string | null; img: string; alt?: string }> =
    [
      {
        href: mediasUrls.behance,
        img: "/behance.png",
        alt: "Behance",
      },
      {
        href: mediasUrls.instagram,
        img: "/instagram.png",
        alt: "Instagram",
      },
      {
        href: mediasUrls.lattes,
        img: "/lattes.png",
        alt: "Lattes",
      },
      {
        href: mediasUrls.whatsapp,
        img: "/whatsapp.png",
        alt: "WhatsApp",
      },
    ];

  return (
    <footer className="flex w-full p-5 gap-2 justify-center">
      {socialLinks.map(
        ({ href, img, alt }) =>
          href && (
            <Button key={href} variant="ghost" size="icon" asChild>
              <Link href={href} target="_blank" className="relative">
                <Image fill src={img} alt={alt ?? ""} className="dark:invert" />
              </Link>
            </Button>
          )
      )}
    </footer>
  );
}

const Footer = memo(FooterComponent);
export default Footer;
