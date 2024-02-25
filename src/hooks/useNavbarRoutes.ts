import { useSession } from "next-auth/react";

type NavbarRouteType = {
  baseRoute: string;
  name: string;
  routes?: SubRouteNavbarType[];
  target?: "_self" | "_blank";
};

type SubRouteNavbarType = {
  description: string;
  href: string;
  name: string;
  target: "_self" | "_blank";
};

const navbarRoutes: NavbarRouteType[] = [
  {
    name: "Student",
    baseRoute: "/student",
    routes: [
      {
        description: "All information du som student behöver",
        href: "/student",
        name: "Student",
        target: "_self",
      },
      {
        description: "Funderar du på att söka?",
        href: "/student/new-student",
        name: "Ny student",
        target: "_self",
      },
      {
        description:
          "Är plugget tungt och eller har du något du vill prata om?",
        href: "/student/student-health",
        name: "Studenthälsa",
        target: "_self",
      },
    ],
  },
  {
    name: "Sektionen",
    baseRoute: "/student-division",
    routes: [
      {
        description: "Historia, uppbyggnad och aspning!",
        href: "/student-division",
        name: "Sektionen",
        target: "_self",
      },
      {
        description: "Dokument",
        href: "/student-division/documents",
        name: "Dokument",
        target: "_self",
      },
      {
        name: "Zaloonen",
        href: "/student-division/zaloonen",
        target: "_self",
        description:
          "Zaloonen är zätas egna sektionslokal. Här kan du boka den!",
      },
      {
        name: "Sektionsorgan",
        href: "/student-division/committees",
        target: "_self",
        description:
          "Här kan du läsa mer om sektionens olika organ och funktion",
      },
    ],
  },

  { name: "För Företag", baseRoute: "/business", target: "_self" },
  { name: "Bilder", baseRoute: "https://zfoto.ztek.se", target: "_blank" },
];

export const useNavbarRoutes = (): NavbarRouteType[] => {
  const { status } = useSession();

  if (status === "authenticated")
    return [
      ...navbarRoutes,
      { name: "Aktiv", baseRoute: "/active", target: "_self" },
    ];

  return navbarRoutes;
};
