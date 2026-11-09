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
    <NavigationMenuLink
      active={pathname == href}
      className={cn(
        navigationMenuTriggerStyle(),
        "rounded-full border border-zWhite/15 bg-zWhite/10 px-4 py-2 text-zWhite/80 shadow-sm transition hover:bg-zWhite/20 hover:text-zWhite focus:bg-zWhite/20 focus:text-zWhite data-[active]:bg-zWhite/20 data-[state=open]:bg-zWhite/20",
        pathname === href && "bg-zWhite/20 text-zWhite",
      )}
      asChild
    >
      <Link
        href={href}
        referrerPolicy={newPage ? "no-referrer" : undefined}
        target={newPage ? "_blank" : "_self"}
      >
        {label}
      </Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);
