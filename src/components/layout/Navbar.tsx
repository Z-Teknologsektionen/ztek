import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";

const Navbar: FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="my-8 bg-zDarkGray text-zWhite">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Add a class to the logo link */}
              <Link
                className="hidden text-xl font-bold text-zWhite md:block"
                href="/"
              >
                <Image alt="Logo" height={120} src="/logo.png" width={120} />
              </Link>
              {/* Display the logo on smaller screens */}
              <div className="md:hidden">
                <Link href="/">
                  <Image alt="Logo" height={60} src="/logo.png" width={60} />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/" isActive={router.pathname === "/"}>
                  Home
                </NavLink>
                <NavLink href="/about" isActive={router.pathname === "/about"}>
                  Om Z
                </NavLink>
                <NavLink href="/organ" isActive={router.pathname === "/organ"}>
                  Sektionsorgan
                </NavLink>
                <NavLink href="/admin" isActive={router.pathname === "/admin"}>
                  Logga in
                </NavLink>
              </div>
            </div>
          </div>
          {/* Hamburger Icon for smaller screens */}
          <div className="flex items-center md:hidden">
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
          <div className="md:hidden ">
            <div className="ml-10 mt-2 flex flex-col space-y-2">
              <NavLink href="/" isActive={router.pathname === "/"}>
                Home
              </NavLink>
              <NavLink href="/about" isActive={router.pathname === "/about"}>
                Om Z
              </NavLink>
              <NavLink href="/organ" isActive={router.pathname === "/organ"}>
                Sektionsorgan
              </NavLink>
              <NavLink href="/admin" isActive={router.pathname === "/admin"}>
                Logga in
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}

const NavLink: FC<NavLinkProps> = ({ href, isActive, children }) => {
  const activeClass = isActive
    ? "block transition-all duration-500 max-w-full"
    : "block transition-all duration-500 group-hover:max-w-full max-w-0 h-1";

  return (
    <Link
      className={
        "group rounded-md px-3 py-2 text-sm font-medium transition duration-300"
      }
      href={href}
    >
      {children}
      <span className={`h-1 rounded bg-zRed ${activeClass}`} />
    </Link>
  );
};

export default Navbar;