import type { LinkGroupItem, LinkItem, NavbarLink } from "~/types/navbar-types";

export const checkIfNavbarItem = (item: NavbarLink): item is LinkItem =>
  (item as LinkGroupItem).subLinks === undefined;
