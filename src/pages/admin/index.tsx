import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import Unauthorized from "~/components/layout/Unauthorized";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const availableRoutes = [
  {
    name: "Skapa event",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "",
  },
  {
    name: "Administera Organet",
    desc: "Har du precis gått på och vill byta namn på sittande och byta logga? Klicka här då :)",
    route: "/admin/organ/edit",
  },
  {
    name: "Administera Dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    route: "/admin/documents",
  },
  {
    name: "Administera Zaloonen",
    desc: "Här kan du som sittande i ZÅG administrera och se bokningar i Zaloonen.",
    route: "/admin/zaloonen",
    requiredRoles: ["ZALOONEN"],
  },
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
  const { data } = useSession({ required: true });

  if (!data) return <Unauthorized />;

  return (
    <SectionWrapper>
      <SectionTitle>Välkommen {data.user.name}!</SectionTitle>
      <div className="flex flex-wrap gap-4">
        {availableRoutes.map((route) => (
          <div key={route.name} className="w-full sm:w-1/3 md:w-1/5 lg:w-1/6 ">
            <Card className="bg-zWhite">
              <CardHeader>
                <CardTitle>{route.name}</CardTitle>
              </CardHeader>
              <div className="mb-4 flex-grow">
                <CardContent className="min-h-[40px] overflow-hidden break-words">
                  {route.desc}
                </CardContent>
              </div>
              <CardFooter>
                <Link
                  className={`${buttonVariants({
                    variant: "outline",
                  })} w-full`}
                  href={route.route}
                >
                  <MdArrowForward></MdArrowForward>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AdminHomePage;
