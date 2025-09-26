import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ContainerImageHomeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  imageId?: string;
  disableLink?: boolean;
}

const ContainerImageHome = ({
  children,
  imageId,
  className,
  disableLink = false,
  ...rest
}: ContainerImageHomeProps) => {
  const content = (
    <div
      {...rest}
      className={cn(
        "relative aspect-square overflow-hidden rounded-xl bg-muted shadow-md",
        className
      )}
    >
      {children}
    </div>
  );

  if (disableLink) return content;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return <Link href={`/gallery?id=${imageId}`}>{content}</Link>;
};

export default ContainerImageHome;
