"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Fragment, useState, type FC } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
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
          className="rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 hover:text-white lg:hidden"
          variant="ghost"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-white/15 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_35%),linear-gradient(135deg,_rgba(9,9,11,0.95)_0%,_rgba(43,43,53,0.9)_45%,_rgba(135,140,150,0.9)_100%)] text-white">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigationsfält</SheetTitle>
          <SheetDescription className="sr-only">
            Navigationsfält som används för att navigera hemsidan på mobila
            enheter
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="mt-4 h-full">
          <div className="flex w-fit flex-col">
            {linkItems.map((link) => {
              if (!checkIfNavbarSubItem(link)) {
                return (
                  <Link
                    key={link.href}
                    className={cn(
                      buttonVariants({
                        size: "default",
                        variant: "link",
                      }),
                      "w-fit",
                      link.href === pathname &&
                        "bg-slate-200/60 hover:bg-slate-200/80",
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
                    <span className="-mb-2 inline-flex h-11 items-center px-4 text-sm font-medium">
                      {link.label}
                    </span>
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        className={buttonVariants({
                          size: "default",
                          variant: "link",
                          className: "ml-8 w-fit font-normal",
                        })}
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
