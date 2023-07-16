import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <nav className="bg-zBlack">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link className="text-xl font-bold text-zWhite" href="/">
                Logo
              </Link>
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
              </div>
            </div>
          </div>
          <div className="ml-4">
            <NavLink href="/admin" isActive={router.pathname === "/admin"}>
              Logga in
            </NavLink>
          </div>
        </div>
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
    ? "bg-zBlack text-zWhite"
    : "bg-zBlack hover:bg-gray-700 hover:text-zWhite";
  return (
    <Link
      className={`rounded-md px-3 py-2 text-sm font-medium ${activeClass}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Navbar;
