"use client";

import { ExpandIcon, Minimize } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { useIsFullscreen } from "@/hooks/use-is-fullscreen";

const ExpandFullSizeButton = ({
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const isFullscreen = useIsFullscreen();

  const toggleFullscreen = () => {
    const target = document.getElementById("gallery-container");
    if (!document.fullscreenElement) {
      target?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Button
      size="icon"
      variant="overlay"
      aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
      onClick={(e) => (onClick ? onClick(e) : toggleFullscreen())}
      {...rest}
    >
      {isFullscreen ? <Minimize /> : <ExpandIcon />}
    </Button>
  );
};

export default ExpandFullSizeButton;
