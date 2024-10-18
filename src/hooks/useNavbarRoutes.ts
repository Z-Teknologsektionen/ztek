import { useSession } from "next-auth/react";
import type { NavbarLink } from "~/types/navbar-types";

const navbarRoutes: NavbarLink[] = [
  {
    label: "Student",
    href: "/student",
    subLinks: [
      {
        label: "Studiesocialt stöd",
        href: "/student/student-health",
      },
      {
        label: "Söka Z",
        href: "/student/new-student",
      },
    ],
  },
  {
    label: "Zaloonen",
    href: "/student-division/zaloonen",
  },
  {
    label: "Dokument",
    href: "/documents",
  },
  {
    label: "Sektionen",
    href: "/student-division",
  },
  {
    label: "Sektions organ",
    href: "/student-division/committees",
  },
  {
    label: "För företag",
    href: "/business",
  },
  {
    label: "Media",
    subLinks: [
      {
        label: "zFotos bilder",
        href: "https://zfoto.ztek.se",
        newPage: true,
      },
      {
        label: "Zeniths media",
        href: "/student-division/zenith-media",
      },
    ],
  },
];

export const useNavbarRoutes = (): NavbarLink[] => {
  const { status } = useSession();

  if (status === "authenticated")
    return [
      ...navbarRoutes,
      { label: "Aktiv", href: "/active", newPage: false },
    ];

  return navbarRoutes;
};
