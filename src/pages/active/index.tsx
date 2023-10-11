import { AccountRoles } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import { MdArrowForward } from "react-icons/md";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface InfoCardProps {
  desc: string;
  name: string;
  route: string;
}

interface ActiveInfoCardProps extends InfoCardProps {
  requiredRole: AccountRoles | undefined;
}

export const activeRoutes: ActiveInfoCardProps[] = [
  {
    name: "Skapa event",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "/active/events",
    requiredRole: AccountRoles.CREATE_POST,
  },
  {
    name: "Administera Organet",
    desc: "Har du precis gått på och vill byta namn på sittande och byta logga? Klicka här då :)",
    route: "/organ/edit",
    requiredRole: undefined,
  },
  {
    name: "Administera Dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    route: "/active/documents",
    requiredRole: AccountRoles.MODIFY_DOCUMENTS,
  },
  {
    name: "Administera Zaloonen",
    desc: "Här kan du som sittande i ZÅG administrera och se bokningar i Zaloonen.",
    route: "/active/zaloonen",
    requiredRole: AccountRoles.ZALOONEN,
  },
];

export const adminRoutes: InfoCardProps[] = [
  {
    name: "Administrera medlemmar",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "/admin/members",
  },
  {
    name: "Administrera organ",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "/admin/organ",
  },
];

const AdminHomePage: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return null;

  const { user } = session;
  return (
    <>
      <HeadLayout title="Aktiv panel"></HeadLayout>

      <SectionWrapper>
        <SectionTitle>Välkommen {user.name}!</SectionTitle>
        <div className="flex flex-col gap-4">
          {user.admin &&
            adminRoutes.map((route) => (
              <InfoCard {...route} key={route.route} />
            ))}

          {activeRoutes.map((route) => {
            if (
              route.requiredRole !== undefined &&
              !user.roles.includes(route.requiredRole) &&
              !user.admin
            )
              return null;

            return <InfoCard {...route} key={route.route} />;
          })}
        </div>
      </SectionWrapper>
    </>
  );
};

const InfoCard: FC<InfoCardProps> = ({ desc, name, route }) => (
  <Card className="bg-zWhite">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>{desc}</CardContent>
    <CardFooter className="justify-center sm:justify-end">
      <Link
        className={buttonVariants({
          variant: "outline",
          size: "lg",
          className: "w-full sm:w-auto",
        })}
        href={route}
      >
        <MdArrowForward />
      </Link>
    </CardFooter>
  </Card>
);

export default AdminHomePage;
