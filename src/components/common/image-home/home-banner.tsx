import { ImageDTO } from "@/app/data/image/image-dto";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import FadeImage from "../fade-image";

interface HomeBannerProps {
  image: ImageDTO;
  className?: string;
}

/** Wide artwork at the top of the home page, chosen in the admin profile. */
const HomeBanner = ({ image, className }: HomeBannerProps) => {
  return (
    <div
      style={staggerStyle(0)}
      className={cn(
        "relative w-full max-w-6xl overflow-hidden rounded-xl bg-muted shadow-md",
        "aspect-[4/3] sm:aspect-[21/9] lg:aspect-[3/1]",
        staggerClassName,
        className
      )}
    >
      <FadeImage
        src={image.imageUrl}
        alt={image.title}
        fill
        sizes="(max-width: 1152px) 100vw, 1152px"
        // The banner is the largest element above the fold (LCP).
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />
    </div>
  );
};

export default HomeBanner;
