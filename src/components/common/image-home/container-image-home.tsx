import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ContainerImageHomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerImageHome = ({
  children,
  className,
  ...rest
}: ContainerImageHomeProps) => {
  return (
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
};

export default ContainerImageHome;
