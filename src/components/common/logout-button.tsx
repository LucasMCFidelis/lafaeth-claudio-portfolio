"use client"

import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

interface LogoutButtonProps {
  typeComplexity?: "basic" | "full";
}

const LogoutButton = ({ typeComplexity = "basic" }: LogoutButtonProps) => {
  return (
    <Button onClick={() => authClient.signOut()} size={typeComplexity === "basic" ? "icon" : "default"}>
      {typeComplexity === "full" && <>Sair</>}
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
