import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import { MdArrowForward } from "react-icons/md";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
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
import type { AdminRouteProps } from "~/data/routes";
import { activeRoutes, adminRoutes } from "~/data/routes";

type InfoCardProps = AdminRouteProps;

const AdminHomePage: NextPage = () => {
  const { data: session } = useSession({ required: true });

  if (!session) return null;

  const { user } = session;

  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <SectionTitle>Välkommen {user.name}!</SectionTitle>
        <p>
          Här kan du som sektionsaktiv administrera olika delar av hemsidan
          beroende på din roll. Om du inte har tillgång till en sida som du tror
          att du borde ha tillgång till, kontakta då någon i Webbgruppen eller
          Informationsansvarig i Ztyret.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        {user.admin && <SecondaryTitle center>Administratör</SecondaryTitle>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user.admin &&
            adminRoutes.map((route) => (
              <InfoCard {...route} key={route.route} />
            ))}
        </div>
      </SectionWrapper>
    </RoleWrapper>
  );
};

const InfoCard: FC<InfoCardProps> = ({ desc, name, route }) => (
  //Controls height for the cards, change h-XX to accomodate more text
  <Card className="col-span-1 h-60 bg-zWhite">
    <CardHeader className="h-[30%]">
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent className="h-[50%]">{desc}</CardContent>
    <CardFooter className="h-[20%] justify-center sm:justify-center">
      <Link
        className={buttonVariants({
          variant: "outline",
          size: "lg",
          className: "w-full",
        })}
        href={route}
      >
        <MdArrowForward />
      </Link>
    </CardFooter>
  </Card>
);

export default AdminHomePage;
