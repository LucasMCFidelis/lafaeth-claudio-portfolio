"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import getPreferenceTheme from "@/helpers/get-theme-preference";

import { Button } from "../ui/button";

const THEME_CHANGE_EVENT = "theme-change";

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
    localStorage.setItem("darkTheme", String(!darkTheme));
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <Button size={"icon"} onClick={toggleTheme}>
      {darkTheme ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ToggleTheme;
