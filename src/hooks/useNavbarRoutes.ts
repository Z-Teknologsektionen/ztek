import { useSession } from "next-auth/react";
import type { NavbarItem } from "~/types/navbar-types";

const navbarRoutes: NavbarItem[] = [
  {
    label: "Student",
    sublinks: [
      {
        label: "Om Programmet",
        href: "/student",
      },
      {
        label: "Söka Z",
        href: "/student/new-student",
      },
      {
        label: "Schema",
        href: "/student/schedule",
      },
      {
        label: "Studiesocialt stöd",
        href: "/student/student-health",
      },
      {
        label: "Mentorskapsprogram",
        href: "https://www.argz.se/mentorskapsprogram/",
        newPage: true,
      },
    ],
  },
  {
    label: "Sektionen",
    sublinks: [
      {
        label: "Om sektionen",
        href: "/student-division",
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
