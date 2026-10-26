import { Metadata } from "next";

import ContainerImageHome from "@/components/common/image-home/container-image-home";
import HomeBanner from "@/components/common/image-home/home-banner";
import ImageHome from "@/components/common/image-home/image-home";
import PageTransition from "@/components/common/page-transition";
import ProfileImage from "@/components/common/profile-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { imageLoadingProps, PRIORITY_ITEMS } from "@/helpers/image-sizes";

import getHomeImagesCached from "../data/image/get-home-images";
import getUserData from "../data/user/get-user-data";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Inicio",
  description:
    "Página inicial do portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página inclui um breve sobre e images destacadas com possibilidade de abertura em galeria",
};

export default async function Home() {
  // Both reads are cached ("use cache"), so this page is prerendered.
  const [user, imagesHome] = await Promise.all([
    getUserData(),
    getHomeImagesCached(),
  ]);

  return (
    <PageTransition>
      {user?.bannerImage && <HomeBanner image={user.bannerImage} />}
      <div className="w-full max-w-screen flex flex-col gap-5 md:gap-10 items-center px-5 mx-auto my-5">
        <Card className="w-full max-w-6xl dark:shadow-none">
          {user ? (
            <CardContent className="flex flex-col-reverse items-center sm:flex-row-reverse">
              <>
                <CardHeader className="flex-1 w-full text-center">
                  <CardTitle className="font-heading font-medium leading-normal text-3xl md:text-4xl">
                    Sobre {user?.name}
                  </CardTitle>
                  {user?.description && (
                    <CardDescription className="mx-auto max-w-prose text-foreground text-base md:text-lg tracking-wider leading-normal first-letter:uppercase">
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
          {imagesHome.map((image, index) => (
            <ContainerImageHome key={image.id} imageId={image.id} index={index}>
              <ImageHome
                src={image.imageUrl}
                alt={image.title}
                {...imageLoadingProps(index < PRIORITY_ITEMS)}
              />
            </ContainerImageHome>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
