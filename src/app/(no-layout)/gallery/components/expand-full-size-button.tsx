"use client";

import { ExpandIcon, Minimize } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { ButtonHTMLAttributes, useEffect } from "react";

import { Button } from "@/components/ui/button";

const ExpandFullSizeButton = ({
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
      onClick={(e) => (onClick ? onClick(e) : toggleFullscreen())}
      {...rest}
    >
      {isFullscreen ? <Minimize /> : <ExpandIcon />}
    </Button>
  );
};

export default ExpandFullSizeButton;
