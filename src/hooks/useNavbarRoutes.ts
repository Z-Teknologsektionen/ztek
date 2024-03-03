import { useSession } from "next-auth/react";

type NavbarRouteType = {
  href: string;
  name: string;
  target: "_self" | "_blank";
};

const navbarRoutes: NavbarRouteType[] = [
  { name: "Student", href: "/student", target: "_self" },
  {
    name: "Zaloonen",
    href: "/student-division/zaloonen",
    target: "_self",
  },
  { name: "Dokument", href: "/documents", target: "_self" },
  { name: "Sektionen", href: "/student-division", target: "_self" },
  {
    name: "Sektionsorgan",
    href: "/student-division/committees",
    target: "_self",
  },
  { name: "För Företag", href: "/business", target: "_self" },
  { name: "Bilder", href: "https://zfoto.ztek.se", target: "_blank" },
];

export const useNavbarRoutes = (): NavbarRouteType[] => {
  const { status } = useSession();

  if (status === "authenticated")
    return [
      ...navbarRoutes,
      { name: "Aktiv", href: "/active", target: "_self" },
    ];

  return navbarRoutes;
};
