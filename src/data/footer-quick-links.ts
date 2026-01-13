type FooterQuickLinks = {
  blank: boolean;
  href: string;
  text: string;
};

export const footerQuickLinks = [
  {
    text: "Canvas",
    href: "https://chalmers.instructure.com/",
    blank: true,
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
] as const satisfies FooterQuickLinks[];
