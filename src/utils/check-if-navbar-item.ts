import type { NavbarItem, NavbarItemWithSublinks } from "~/types/navbar-types";

export const checkIfNavbarSubItem = (
  item: NavbarItem,
): item is NavbarItemWithSublinks =>
  (item as NavbarItemWithSublinks).sublinks !== undefined;
