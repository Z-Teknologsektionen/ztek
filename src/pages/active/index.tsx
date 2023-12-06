import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import { MdArrowForward } from "react-icons/md";
import HeadLayout from "~/components/layout/HeadLayout";
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
    <>
      <HeadLayout title="Sektionsaktiv"></HeadLayout>

      <SectionWrapper>
        <SectionTitle>Välkommen {user.name}!</SectionTitle>
        <p>
          Här kan du som sektionsaktiv administrera olika delar av hemsidan
          beroende på din roll. Om du inte har tillgång till en sida som du tror
          att du borde ha tillgång till, kontakta då någon i Webbgruppen eller
          Informationsansvarig i Ztyret.
        </p>
        <div className="flex flex-col gap-4 ">
          {activeRoutes.map((route) => {
            if (
              route.requiredRole !== undefined &&
              !user.roles.includes(route.requiredRole) &&
              !user.admin
            )
              return null;

            return <InfoCard {...route} key={route.route} />;
          })}
          {user.admin && <SecondaryTitle center>Administratör</SecondaryTitle>}
          {user.admin &&
            adminRoutes.map((route) => (
              <InfoCard {...route} key={route.route} />
            ))}
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
