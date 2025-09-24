import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ContainerImageHomeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  imageId: string;
}

const ContainerImageHome = ({
  children,
  imageId,
  className,
  ...rest
}: ContainerImageHomeProps) => {
  return (
    <Link href={`/gallery?id=${imageId}`}>
      <div
        {...rest}
        className={cn(
          "relative aspect-square overflow-hidden rounded-xl bg-muted shadow-md",
          className
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export default ContainerImageHome;
