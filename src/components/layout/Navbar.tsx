import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";

const Navbar: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };
  const routes = [
    { name: "Student", href: "/student", target: "_self" },
    {
      name: "Zaloonen",
      href: "/studentDivision/zaloonen",
      target: "_self",
    },
    { name: "Dokument", href: "/documents", target: "_self" },
    { name: "Sektionen", href: "/studentDivision", target: "_self" },
    {
      name: "Sektionsorgan",
      href: "/studentDivision/committees",
      target: "_self",
    },
    { name: "För Företag", href: "/business", target: "_self" },
    { name: "Bilder", href: "https://zfoto.ztek.se", target: "_blank" },
  ];
  if (session?.user)
    routes.push({ name: "Aktiv", href: "/active", target: "_self" });
  return (
    <nav className="my-8 bg-zBlack text-zWhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-100 flex h-12 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                className="hidden text-xl font-bold text-zWhite lg:block"
                href="/"
              >
                <Image alt="Logo" height={100} src="/logo.png" width={100} />
              </Link>
              {/* Display the logo on smaller screens */}
              <div className="lg:hidden">
                <Link href="/">
                  <Image alt="Logo" height={60} src="/logo.png" width={60} />
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
              {routes.map((route) => (
                <NavLink
                  key={`open-${route.name}`}
                  href={route.href}
                  isActive={router.pathname === route.href}
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
              {routes.map((route) => (
                <NavLink
                  key={`mobile-${route.name}`}
                  href={route.href}
                  isActive={router.pathname === route.href}
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

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  target: string;
}

const NavLink: FC<NavLinkProps> = ({ href, isActive, target, children }) => {
  const activeClass = isActive
    ? "block transition-all duration-500 max-w-full"
    : "block transition-all duration-500 group-hover:max-w-full max-w-0 h-1";

  return (
    <Link
      className={
        "group items-center rounded-md px-3 py-2 text-sm font-medium transition"
      }
      href={href}
      rel={target == "_blank" ? "noopener noreferrer" : "none"}
      target={target}
    >
      {children}
      <span className={`h-1 rounded bg-zDarkGray ${activeClass}`} />
    </Link>
  );
};

export default Navbar;
