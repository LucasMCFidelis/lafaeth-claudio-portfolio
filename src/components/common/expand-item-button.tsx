"use client";

import { VariantProps } from "class-variance-authority";
import { Expand } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../ui/button";

type ExpandItemButtonProps<TypeLink extends boolean> = {
  typeLink?: TypeLink;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  (TypeLink extends true
    ? {
        href: string;
      }
    : { href?: never });

const ExpandItemButton = <TypeLink extends boolean>({
  typeLink,
  children,
  className,
  href,
  onClick,
  ...rest
}: ExpandItemButtonProps<TypeLink>) => {
  const router = useRouter();
  return (
    <Button
      onClick={(event) => {
        onClick?.(event);
        if (typeLink && href) {
          router.push(href);
        }
      }}
      className={cn(className, "absolute top-0 right-0 z-30")}
      {...rest}
    >
      {children ? children : <Expand />}
    </Button>
  );
};

export default ExpandItemButton;
