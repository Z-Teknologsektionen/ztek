import Link from "next/link";
import type { FC } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTemp,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Separator } from "~/components/ui/separator";
import type { NavbarLink } from "~/types/navbar-types";
import { checkIfNavbarItem } from "~/utils/check-if-navbar-item";
import { cn } from "~/utils/utils";

type NavbarDesktopLinksProps = {
  linkItems: NavbarLink[];
  pathname: string;
};

export const NavbarDesktopLinks: FC<NavbarDesktopLinksProps> = ({
  pathname,
  linkItems,
}) => {
  return (
    <NavigationMenuTemp className="dark hidden lg:flex">
      <NavigationMenuList className="flex items-center justify-center">
        {linkItems.map((link) => {
          if (checkIfNavbarItem(link)) {
            return (
              <NavigationMenuItem key={link.href}>
                <CustomNavigationMenulink
                  href={link.href}
                  label={link.label}
                  newPage={link.newPage}
                  pathname={pathname}
                />
              </NavigationMenuItem>
            );
          } else {
            return (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuTrigger
                  className="submenu-trigger border-0 dark:bg-transparent"
                  showChevron={!!link.href}
                >
                  {link.href !== undefined ? (
                    <Link
                      href={link.href}
                      referrerPolicy={link.newPage ? "no-referrer" : undefined}
                      target={link.newPage ? "_blank" : "_self"}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>{link.label}</>
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-zBlack">
                  <div className="flex w-[150px] flex-col items-center justify-center gap-1">
                    {link.href !== undefined && (
                      <>
                        <CustomNavigationMenuSublink
                          href={link.href}
                          label={link.label}
                          newPage={link.newPage}
                        />
                        <Separator className="mx-auto h-1 w-4/5 rounded dark:bg-zDarkGray" />
                      </>
                    )}
                    {link.subLinks.map((sublink) => (
                      <CustomNavigationMenuSublink
                        key={sublink.href}
                        href={sublink.href}
                        label={sublink.label}
                        newPage={sublink.newPage}
                      />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenuTemp>
  );
};

const CustomNavigationMenulink: FC<{
  href: string;
  label: string;
  newPage?: boolean;
  pathname: string;
}> = ({ href, label, pathname, newPage }) => (
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
);

const CustomNavigationMenuSublink: FC<{
  href: string;
  label: string;
  newPage?: boolean;
}> = ({ href, label, newPage }) => (
  <Link
    href={href}
    referrerPolicy={newPage ? "no-referrer" : undefined}
    target={newPage ? "_blank" : "_self"}
    legacyBehavior
    passHref
  >
    <NavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        "h-full w-full text-center dark:bg-zBlack",
      )}
    >
      {label}
    </NavigationMenuLink>
  </Link>
);
