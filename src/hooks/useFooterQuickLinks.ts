import { useSession } from "next-auth/react";

type FooterQuickLinksType = {
  blank?: boolean;
  href: string;
  text: string;
};

const footerQuickLinks: FooterQuickLinksType[] = [
  {
    text: "Canvas",
    href: "https://chalmers.instructure.com/",
  },
  {
    text: "TimeEdit",
    href: "https://cloud.timeedit.net/chalmers/web/public/",
    blank: true,
  },
  {
    text: "Boka Grupprum",
    href: "https://cloud.timeedit.net/chalmers/web/b1/",
    blank: true,
  },
];

export const useFooterQuickLinks = (): FooterQuickLinksType[] => {
  const { status } = useSession();
  if (status === "authenticated")
    return [
      ...footerQuickLinks,
      {
        text: "Logga ut",
        href: "/",
        blank: false,
      },
    ];
  if (status === "unauthenticated")
    return [
      ...footerQuickLinks,
      {
        text: "Logga in",
        href: "/active",
        blank: false,
      },
    ];
  return footerQuickLinks;
};
