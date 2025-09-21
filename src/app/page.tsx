import { User2 } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import getUserData from "./data/user/get-user-data";

export default async function Home() {
  const user = await getUserData();

  return (
    <div className="w-full max-w-screen px-5 mx-auto my-5">
      <Card>
        {user ? (
          <CardContent className="flex flex-col-reverse items-center sm:flex-row-reverse">
            <>
              <CardHeader className="flex-1 w-full text-center">
                <CardTitle className=" font-bold text-2xl md:text-3xl">
                  Sobre {user?.name}
                </CardTitle>
                {user?.description && (
                  <CardDescription className="sm:text-md md:text-lg first-letter:uppercase">
                    {user?.age && `tenho ${user.age} anos, `}{user.description}
                  </CardDescription>
                )}
              </CardHeader>
              <div className="relative size-36 sm:size-60 md:size-96 rounded-xl overflow-hidden bg-muted">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={`Perfil ${user?.name}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <User2 className="size-full" />
                )}
              </div>
            </>
          </CardContent>
        ) : (
          <p className="w-full text-center">Usuário não encontrado</p>
        )}
      </Card>
    </div>
  );
}
