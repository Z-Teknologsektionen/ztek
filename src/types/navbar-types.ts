export type LinkGroupItem = {
  href?: string;
  label: string;
  newPage?: boolean;
  subLinks: LinkItem[];
};

export type LinkItem = {
  href: string;
  label: string;
  newPage?: boolean;
};

export type NavbarLink = LinkGroupItem | LinkItem;
