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
    <nav className="relative">
      <div className="relative overflow-hidden  bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_35%),linear-gradient(135deg,_rgba(9,9,11,0.95)_0%,_rgba(43,43,53,0.9)_45%,_rgba(135,140,150,0.9)_100%)] px-4 py-4 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-zBlack/60 border-b border-white/15" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Link
                className="relative flex size-14 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 p-1 shadow-lg sm:size-16 lg:size-20"
                href="/"
              >
                <Image alt="Logo" className="object-contain" src="/logo.png" fill />
              </Link>
            </div>
            <div className="hidden xl:block">
              <div className="flex-container max-h-12 flex-row break-keep">
                <Link className="flex flex-col" href="/">
                  <div className="text-base font-semibold uppercase tracking-[0.2em] text-white">
                    Automation och Mekatronik
                  </div>
                  <div className="text-sm text-white/70">
                    Chalmers tekniska högskola
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NavbarDesktopLinks linkItems={navbarRoutes} pathname={pathname} />
            <NavbarMobileLinks linkItems={navbarRoutes} pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
