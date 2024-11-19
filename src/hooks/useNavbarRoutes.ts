import { useSession } from "next-auth/react";
import type { NavbarItem } from "~/types/navbar-types";

const navbarRoutes: NavbarItem[] = [
  {
    label: "Student",
    sublinks: [
      {
        href: "/student",
        label: "Information",
      },
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
    label: "Sektionen",
    sublinks: [
      {
        href: "/student-division",
        label: "Information",
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
        label: "Sektionsorgan",
        href: "/student-division/committees",
      },
    ],
  },
  {
    label: "För företag",
    href: "/business",
  },
  {
    label: "Media",
    sublinks: [
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

export const useNavbarRoutes = (): NavbarItem[] => {
  const { status } = useSession();

  if (status === "authenticated")
    return [
      ...navbarRoutes,
      { label: "Aktiv", href: "/active", newPage: false },
    ];

  return navbarRoutes;
};
