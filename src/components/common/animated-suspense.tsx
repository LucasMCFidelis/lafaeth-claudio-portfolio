import { Suspense, ViewTransition } from "react";

interface AnimatedSuspenseProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/**
 * <Suspense> whose fallback leaves quickly and whose content arrives with a
 * soft fade and upward slide (classes in globals.css). The animation runs
 * when the data streams in; content already in the static shell just shows.
 */
const AnimatedSuspense = ({ fallback, children }: AnimatedSuspenseProps) => {
  return (
    <Suspense
      fallback={
        <ViewTransition exit="skeleton-exit" default="none">
          {fallback}
        </ViewTransition>
      }
    >
      <ViewTransition enter="content-enter" default="none">
        {children}
      </ViewTransition>
    </Suspense>
  );
};

export default AnimatedSuspense;
