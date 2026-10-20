import { User } from "lucide-react";

import { cn } from "@/lib/utils";

import FadeImage from "./fade-image";

interface ProfileImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

const ProfileImage = ({ src, alt, className }: ProfileImageProps) => {
  return (
    <div
      className={cn(
        "relative size-36 sm:size-60 rounded-xl overflow-hidden bg-muted",
        className
      )}
    >
      {src ? (
        <FadeImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 144px, 240px"
          loading="eager"
          fetchPriority="high"
          className="object-contain"
        />
      ) : (
        <User className="size-full text-primary/70" />
      )}
    </div>
  );
};

export default ProfileImage;
