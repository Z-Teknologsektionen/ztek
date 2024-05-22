"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { useNavbarRoutes } from "~/hooks/useNavbarRoutes";
import NavLink from "./navbar-link";

const Navbar: FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRoutes = useNavbarRoutes();

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="z-10 mt-8 bg-zBlack text-zWhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-100 flex h-12 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                className="hidden text-xl font-bold text-zWhite lg:block"
                href="/"
              >
                <Image
                  alt="Logo"
                  className="z-50"
                  height={100}
                  src="/logo.png"
                  width={100}
                />
              </Link>
              <div className="lg:hidden">
                <Link href="/">
                  <Image
                    alt="Logo"
                    className="z-50"
                    height={60}
                    src="/logo.png"
                    width={60}
                  />
                </Link>
              </div>
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
          <div className="hidden lg:block">
            <div className="flex items-center gap-x-4">
              {navbarRoutes.map((route) => (
                <NavLink
                  key={`open-${route.name}`}
                  href={route.href}
                  isActive={pathname === route.href}
                  target={route.target}
                >
                  {route.name}
                </NavLink>
              ))}
            </div>
          </div>
          {/* Hamburger Icon for smaller screens */}
          <div className="flex items-center lg:hidden">
            <button
              aria-label="Toggle Menu"
              className="rounded-md p-2 text-zWhite"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="ml-10 mt-2 flex flex-col space-y-2">
              {navbarRoutes.map((route) => (
                <NavLink
                  key={`mobile-${route.name}`}
                  href={route.href}
                  isActive={pathname === route.href}
                  target={route.target}
                >
                  <button onClick={toggleMenu}>{route.name}</button>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
