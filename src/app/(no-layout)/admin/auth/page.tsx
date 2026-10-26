import { redirect } from "next/navigation";
import { Suspense } from "react";

import verifyUserLogged from "@/app/data/user/verify-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "./components/login-form";

/** Sends a visitor who is already logged in to the admin. */
const RedirectIfLogged = async () => {
  const userLogged = await verifyUserLogged();
  if (userLogged) redirect("/admin");
  return null;
};

const AuthPage = () => {
  return (
    <Card className="w-full sm:max-w-md">
      <Suspense fallback={null}>
        <RedirectIfLogged />
      </Suspense>
      <CardHeader className="w-full">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre utilizando email e senha cadastrados
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default AuthPage;
