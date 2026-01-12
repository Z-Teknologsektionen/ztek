import Link from "next/link";
import { type FC } from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import type { NavbarItemOnlyLink } from "~/types/navbar-types";
import { cn } from "~/utils/utils";

export const CustomNavigationMenuLink: FC<
  NavbarItemOnlyLink & {
    pathname: string;
  }
> = ({ href, label, pathname, newPage }) => (
  <NavigationMenuItem className="dark">
    <Link
      href={href}
      referrerPolicy={newPage ? "no-referrer" : undefined}
      target={newPage ? "_blank" : "_self"}
      legacyBehavior
      passHref
    >
      <NavigationMenuLink
        active={pathname == href}
        className={cn(
          navigationMenuTriggerStyle(),
          "border-0 dark:bg-transparent",
        )}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
