import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

/** Whether some element of the page is in fullscreen (Fullscreen API). */
export function useIsFullscreen() {
  return useSyncExternalStore(
    subscribe,
    () => !!document.fullscreenElement,
    () => false
  );
}
