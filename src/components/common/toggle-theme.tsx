"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import getPreferenceTheme from "@/helpers/get-theme-preference";

import { Button } from "../ui/button";

const ToggleTheme = () => {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null);

  useEffect(() => {
    const initial = getPreferenceTheme();
    setDarkTheme(initial);
  }, []);

  useEffect(() => {
    if (darkTheme === null) return;

    localStorage.setItem("darkTheme", String(darkTheme));
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return (
    <Button size={"icon"} onClick={() => setDarkTheme((prev) => !prev)}>
      {darkTheme ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ToggleTheme;
