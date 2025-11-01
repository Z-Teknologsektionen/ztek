import { type FC } from "react";
import {
  NavigationMenuList,
  NavigationMenuWithCentredContent,
} from "~/components/ui/navigation-menu";
import type { NavbarItem } from "~/types/navbar-types";
import { checkIfNavbarSubItem } from "~/utils/check-if-navbar-item";
import { CustomNavigationMenuLink } from "./custom-navigation-menu-link";
import { CustomNavigationMenuLinkWithSubmenu } from "./custom-navigation-menu-link-with-submenu";

type NavbarDesktopLinksProps = {
  linkItems: NavbarItem[];
  pathname: string;
};

export const NavbarDesktopLinks: FC<NavbarDesktopLinksProps> = ({
  pathname,
  linkItems,
}) => {
  return (
    //disable expand on hover by setting `delayDuration` high
    // (seems radix UI don't want u to disable this)
    <NavigationMenuWithCentredContent
      className="hidden lg:flex"
      delayDuration={1e20}
      skipDelayDuration={0}
    >
      <NavigationMenuList className="flex items-center justify-center">
        {linkItems.map((link) => {
          if (!checkIfNavbarSubItem(link)) {
            return (
              <CustomNavigationMenuLink
                key={link.href}
                href={link.href}
                label={link.label}
                newPage={link.newPage}
                pathname={pathname}
              />
            );
          } else {
            return (
              <CustomNavigationMenuLinkWithSubmenu
                key={link.label}
                label={link.label}
                sublinks={link.sublinks}
              />
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenuWithCentredContent>
  );
};
