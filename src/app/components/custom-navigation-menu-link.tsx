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
        "rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/80 shadow-sm transition hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white data-[active]:bg-white/20 data-[state=open]:bg-white/20",
        pathname === href && "bg-white/20 text-white",
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
