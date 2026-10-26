import { ViewTransition } from "react";

/**
 * Short crossfade when navigating between pages. Goes in each page.tsx, not
 * in a layout: layouts stay mounted across navigations, so they never enter
 * or exit.
 */
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
};

export default PageTransition;
