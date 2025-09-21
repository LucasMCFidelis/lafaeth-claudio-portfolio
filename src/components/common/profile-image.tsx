import { User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

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
        <Image src={src} alt={alt} fill className="object-contain" />
      ) : (
        <User className="size-full text-primary/70" />
      )}
    </div>
  );
};

export default ProfileImage;
