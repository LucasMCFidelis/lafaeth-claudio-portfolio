import { ImageDTO } from "@/app/data/image/image-dto";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import FadeImage from "../fade-image";

interface HomeBannerProps {
  image: ImageDTO;
  className?: string;
}

/**
 * Wide artwork at the top of the home page, chosen in the admin profile.
 * It spans the whole screen, so the original needs to be at least
 * BANNER_MIN_WIDTH px wide (src/helpers/image-sizes.ts) to look sharp; the
 * admin profile warns when it is smaller.
 */
const HomeBanner = ({ image, className }: HomeBannerProps) => {
  return (
    <div
      style={staggerStyle(0)}
      className={cn(
        "relative w-full overflow-hidden bg-muted shadow-md dark:shadow-none",
        "aspect-[4/3] sm:aspect-[21/9] lg:aspect-[4/1]",
        staggerClassName,
        className
      )}
    >
      <FadeImage
        src={image.imageUrl}
        alt={image.title}
        fill
        // Full screen width: ask for the largest version the original has.
        sizes="100vw"
        // The banner is the largest element above the fold (LCP).
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />
    </div>
  );
};

export default HomeBanner;
