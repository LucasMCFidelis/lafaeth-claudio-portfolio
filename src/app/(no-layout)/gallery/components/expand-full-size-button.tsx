"use client";

import { ExpandIcon, Minimize } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { ButtonHTMLAttributes, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ExpandFullSizeButton = ({
  className,
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isFullscreen, setIsFullscreen] = useQueryState(
    "full-screen",
    parseAsBoolean.withDefault(false)
  );

  const toggleFullscreen = () => {
    const target = document.getElementById("gallery-container");
    if (!document.fullscreenElement) {
      target?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [setIsFullscreen]);

  return (
    <Button
      size="icon"
      className={cn("absolute translate-5 z-10", className)}
      onClick={(e) => (onClick ? onClick(e) : toggleFullscreen())}
      {...rest}
    >
      {isFullscreen ? <Minimize /> : <ExpandIcon />}
    </Button>
  );
};

export default ExpandFullSizeButton;
