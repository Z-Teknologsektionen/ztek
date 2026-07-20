import Link from "next/link";
import { Fragment, type FC } from "react";
import { Button } from "~/components/ui/button";
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import type { NavbarItemWithSublinks } from "~/types/navbar-types";
import { cn } from "~/utils/utils";

export const CustomNavigationMenuLinkWithSubmenu: FC<
  NavbarItemWithSublinks
> = ({ label, sublinks }) => {
  return (
    <NavigationMenuItem className="dark">
      <NavigationMenuTrigger
        className={cn(
          "submenu-trigger rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/80 shadow-sm transition hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white data-[active]:bg-white/20 data-[state=open]:bg-white/20",
        )}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="rounded-[1.25rem] border border-white/15 bg-zBlack/95 p-2 text-white shadow-[0_20px_45px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="flex w-fit flex-col items-center justify-center gap-1">
          {sublinks.map((sublink) => {
            return (
              <Fragment key={sublink.href}>
                <Button
                  key={sublink.href}
                  className="w-full justify-start rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                  size="sm"
                  variant="ghost"
                >
                  <Link
                    className="text-sm font-medium"
                    href={sublink.href}
                    referrerPolicy={sublink.newPage ? "no-referrer" : undefined}
                    target={sublink.newPage ? "_blank" : "_self"}
                  >
                    {sublink.label}
                  </Link>
                </Button>
              </Fragment>
            );
          })}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
