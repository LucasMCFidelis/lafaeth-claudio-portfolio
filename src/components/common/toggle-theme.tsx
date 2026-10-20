"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import getPreferenceTheme from "@/helpers/get-theme-preference";

import { Button } from "../ui/button";

const THEME_CHANGE_EVENT = "theme-change";
const THEME_SWITCHING_CLASS = "theme-switching";
// A bit longer than the 200ms color transition.
const THEME_SWITCHING_MS = 250;

let switchingTimeout: number | undefined;

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

const ToggleTheme = () => {
  // null on the server so the first client render matches the HTML.
  const darkTheme = useSyncExternalStore<boolean | null>(
    subscribe,
    getPreferenceTheme,
    () => null
  );

  useEffect(() => {
    if (darkTheme === null) return;
    document.documentElement.classList.toggle("dark", darkTheme);
  }, [darkTheme]);

  const toggleTheme = () => {
    // Colors fade for a moment instead of switching at once (globals.css).
    const root = document.documentElement;
    root.classList.add(THEME_SWITCHING_CLASS);
    window.clearTimeout(switchingTimeout);
    switchingTimeout = window.setTimeout(
      () => root.classList.remove(THEME_SWITCHING_CLASS),
      THEME_SWITCHING_MS
    );

    localStorage.setItem("darkTheme", String(!darkTheme));
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <Button
      variant="ghost"
      size={"icon"}
      onClick={toggleTheme}
      aria-label={darkTheme ? "Usar tema claro" : "Usar tema escuro"}
    >
      {darkTheme ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ToggleTheme;
