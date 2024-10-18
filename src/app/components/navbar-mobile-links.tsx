import { Menu } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import type { NavbarLink } from "~/types/navbar-types";
import { checkIfNavbarItem } from "~/utils/check-if-navbar-item";
import { cn } from "~/utils/utils";

export const NavbarMobileLinks: FC<{
  linkItems: NavbarLink[];
  pathname: string;
}> = ({ linkItems, pathname }) => {
  return (
    <Sheet>
      <SheetTrigger className="dark" asChild>
        <Button className="lg:hidden" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full">
          <div className="flex w-fit flex-col">
            {linkItems.map((link) => {
              if (checkIfNavbarItem(link)) {
                return (
                  <Link
                    key={link.href}
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "ghost",
                      }),
                      "w-fit",
                      link.href === pathname && "bg-slate-100 text-slate-900",
                    )}
                    href={link.href}
                    referrerPolicy={link.newPage ? "no-referrer" : undefined}
                    target={link.newPage ? "_blank" : "_self"}
                  >
                    {link.label}
                  </Link>
                );
              } else {
                return (
                  <>
                    {link.href !== undefined ? (
                      <Link
                        key={link.href}
                        className={buttonVariants({
                          size: "lg",
                          variant: "ghost",
                          className: "w-fit",
                        })}
                        href={link.href}
                        referrerPolicy={
                          link.newPage ? "no-referrer" : undefined
                        }
                        target={link.newPage ? "_blank" : "_self"}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="inline-flex h-11 items-center px-8 text-sm font-medium">
                        {link.label}
                      </span>
                    )}
                    <Separator />
                    {link.subLinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        className={buttonVariants({
                          size: "default",
                          variant: "ghost",
                          className: "ml-8 w-fit font-normal",
                        })}
                        href={sublink.href}
                        referrerPolicy={
                          sublink.newPage ? "no-referrer" : undefined
                        }
                        target={sublink.newPage ? "_blank" : "_self"}
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </>
                );
              }
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
