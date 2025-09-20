import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "./components/login-form";

const AuthPage = () => {
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
