"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useNavbarRoutes } from "~/hooks/useNavbarRoutes";
import { NavbarDesktopLinks } from "./navbar-desktop-links";
import { NavbarMobileLinks } from "./navbar-mobile-links";

const Navbar: FC = () => {
  const navbarRoutes = useNavbarRoutes();
  const pathname = usePathname() || "";

  return (
    <nav className="z-10 mt-8 bg-zBlack text-zWhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link className="relative block size-16 lg:size-24" href="/">
                <Image alt="Logo" className="z-50" src="/logo.png" fill />
              </Link>
            </div>
            <div className="hidden xl:block">
              <div className="flex-container max-h-12 flex-row break-keep">
                <Link href="/">
                  <div className="text-lg">Automation och Mekatronik</div>
                  <div className="text-sm">Chalmers tekniska högskola</div>
                </Link>
              </div>
            </div>
          </div>
          <NavbarDesktopLinks linkItems={navbarRoutes} pathname={pathname} />
          <NavbarMobileLinks linkItems={navbarRoutes} pathname={pathname} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
