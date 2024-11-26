export type NavbarItem = NavbarItemOnlyLink | NavbarItemWithSublinks;

export type NavbarItemOnlyLink = {
  href: string;
  label: string;
  newPage?: boolean;
  subLinks?: never;
};
export type NavbarItemWithSublinks = {
  href?: never;
  label: string;
  newPage?: never;
  sublinks: NavbarSubItem[];
};

export type NavbarSubItem = {
  href: string;
  label: string;
  newPage?: boolean;
};
