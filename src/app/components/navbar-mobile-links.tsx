"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Fragment, useState, type FC } from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import type { NavbarItem } from "~/types/navbar-types";
import { checkIfNavbarSubItem } from "~/utils/check-if-navbar-item";
import { cn } from "~/utils/utils";

export const NavbarMobileLinks: FC<{
  linkItems: NavbarItem[];
  pathname: string;
}> = ({ linkItems, pathname }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="dark" asChild>
        <Button
          aria-label="Open navigation menu"
          className="rounded-md border border-zLightGray bg-zBlack text-zWhite hover:bg-zLightBlack hover:text-zWhite lg:hidden"
          variant="ghost"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-zLightBlack bg-zBlack text-zWhite">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className="text-zWhite">Meny</SheetTitle>
          <SheetDescription className="sr-only">
            Navigationsfält som används för att navigera hemsidan på mobila
            enheter
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="flex w-full flex-col gap-1">
            {linkItems.map((link) => {
              if (!checkIfNavbarSubItem(link)) {
                return (
                  <Link
                    key={link.href}
                    className={cn(
                      "flex min-h-11 w-full items-center rounded-md px-4 text-sm font-medium text-zWhite transition-colors hover:bg-zLightBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zLightGray",
                      link.href === pathname &&
                        "bg-zLightBlack hover:bg-zLightBlack",
                    )}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    referrerPolicy={link.newPage ? "no-referrer" : undefined}
                    target={link.newPage ? "_blank" : "_self"}
                  >
                    {link.label}
                  </Link>
                );
              } else {
                return (
                  <Fragment key={link.label}>
                    <span className="mt-4 inline-flex h-8 items-center px-4 text-xs font-semibold uppercase tracking-wide text-zLightGray">
                      {link.label}
                    </span>
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        className={cn(
                          "flex min-h-11 w-full items-center rounded-md px-8 text-sm font-normal text-zWhite transition-colors hover:bg-zLightBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zLightGray",
                          sublink.href === pathname &&
                            "bg-zLightBlack hover:bg-zLightBlack",
                        )}
                        href={sublink.href}
                        onClick={() => setOpen(false)}
                        referrerPolicy={
                          sublink.newPage ? "no-referrer" : undefined
                        }
                        target={sublink.newPage ? "_blank" : "_self"}
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </Fragment>
                );
              }
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
