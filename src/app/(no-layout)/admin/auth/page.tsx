import { redirect } from "next/navigation";

import verifyUserLogged from "@/app/data/user/verify-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "./components/login-form";

const AuthPage = async () => {
  const userLogged = await verifyUserLogged();
  if (userLogged) {
    redirect("/admin");
  }

  return (
    <Card className="w-full sm:max-w-md">
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
