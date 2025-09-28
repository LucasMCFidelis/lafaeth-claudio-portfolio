"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import getPreferenceTheme from "@/helpers/get-theme-preference";

import { Button } from "../ui/button";

const ToggleTheme = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(getPreferenceTheme());

  useEffect(() => {
    localStorage.setItem("darkTheme", `${darkTheme}`);
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
