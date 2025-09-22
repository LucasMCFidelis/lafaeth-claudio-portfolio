import { eq } from "drizzle-orm";
import Image from "next/image";

import ContainerImageHome from "@/components/common/image-home/container-image-home";
import ImageHome from "@/components/common/image-home/image-home";
import ProfileImage from "@/components/common/profile-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

import getUserData from "./data/user/get-user-data";

export default async function Home() {
  const user = await getUserData();
  const imagesHome = await db.query.imagesTable.findMany({
    where: eq(imagesTable.visibleInHome, true),
  });

  return (
    <div className="w-full max-w-screen flex flex-col gap-5 md:gap-10 items-center px-5 mx-auto my-5">
      <Card className="w-full max-w-6xl">
        {user ? (
          <CardContent className="flex flex-col-reverse items-center sm:flex-row-reverse">
            <>
              <CardHeader className="flex-1 w-full text-center">
                <CardTitle className="font-bold text-2xl md:text-3xl">
                  Sobre {user?.name}
                </CardTitle>
                {user?.description && (
                  <CardDescription className="sm:text-md md:text-lg first-letter:uppercase">
                    {user?.age && `tenho ${user.age} anos, `}
                    {user.description}
                  </CardDescription>
                )}
              </CardHeader>
              <ProfileImage src={user.image} alt={`Perfil ${user?.name}`} />
            </>
          </CardContent>
        ) : (
          <p className="w-full text-center">Usuário não encontrado</p>
        )}
      </Card>
      <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {imagesHome.map((image) => (
          <ContainerImageHome key={image.id}>
            <ImageHome src={image.imageUrl} alt={image.title} />
          </ContainerImageHome>
        ))}
      </div>
    </div>
  );
}
