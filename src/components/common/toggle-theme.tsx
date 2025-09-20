"use client";

import { Moon, Sun } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";

import { Button } from "../ui/button";

const ToggleTheme = () => {
  const [darkTheme, setDarkTheme] = useQueryState(
    "darkTheme",
    parseAsBoolean.withDefault(true)
  );

  useEffect(() => {
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
