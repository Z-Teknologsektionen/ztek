"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type FC } from "react";
import { useNavbarRoutes } from "~/hooks/useNavbarRoutes";
import { NavbarDesktopLinks } from "./navbar-desktop-links";
import { NavbarMobileLinks } from "./navbar-mobile-links";

const Navbar: FC = () => {
  return (
    <nav className="relative z-50">
      <div className="relative z-50 overflow-visible bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_35%),linear-gradient(135deg,_rgba(9,9,11,0.95)_0%,_rgba(43,43,53,0.9)_45%,_rgba(135,140,150,0.9)_100%)] px-4 py-4 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="absolute inset-0 border-b border-white/15 bg-zBlack/60" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <Link
                className="relative flex size-14 items-center justify-center rounded-full p-1 sm:size-16 lg:size-20"
                href="/"
              >
                <Image
                  alt="Logo"
                  className="object-contain"
                  src="/logo.png"
                  fill
                />
              </Link>
            </div>
            <div className="min-w-0 flex-1">
              <Link className="flex min-w-0 flex-col" href="/">
                <span className="whitespace-nowrap text-[clamp(0.55rem,1.25vw,1rem)] font-semibold uppercase tracking-[clamp(0.01em,0.15vw,0.2em)] text-white">
                  Automation och Mekatronik
                </span>
                <span className="whitespace-nowrap text-[clamp(0.5rem,1vw,0.875rem)] text-white/70">
                  Chalmers tekniska högskola
                </span>
              </Link>
            </div>
          </div>
          <Suspense fallback={"... loading navbar"}>
            <NavbarLinks />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

const NavbarLinks: FC = () => {
  const navbarRoutes = useNavbarRoutes();
  const pathname = usePathname() || "";
  return (
    <>
      <NavbarDesktopLinks linkItems={navbarRoutes} pathname={pathname} />
      <NavbarMobileLinks linkItems={navbarRoutes} pathname={pathname} />
    </>
  );
};

export default Navbar;
