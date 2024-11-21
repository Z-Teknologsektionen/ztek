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
        className={cn("submenu-trigger border-0 dark:bg-transparent")}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-slate-100 shadow-lg">
        <div className="flex w-fit flex-col items-center justify-center gap-1 p-2">
          {sublinks.map((sublink) => {
            return (
              <Fragment key={sublink.href}>
                <Button
                  key={sublink.href}
                  className="w-full"
                  size="sm"
                  variant="link"
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
