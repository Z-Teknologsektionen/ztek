import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { useNavbarRoutes } from "~/hooks/useNavbarRoutes";
import { cn } from "~/utils/utils";

const Navbar: FC = () => {
  const router = useRouter();
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
              {/* Display the logo on smaller screens */}
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
            <NavigationMenu>
              <NavigationMenuList>
                <div className="flex items-center gap-x-4">
                  {navbarRoutes.map((route) => (
                    <div key={`open-${route.name}`}>
                      <NavigationMenuItem className="z-20">
                        {route.routes && route.routes?.length > 0 ? (
                          <>
                            <NavigationMenuTrigger
                              className={cn("bg-zBlack hover:bg-zDarkGray", {
                                "bg-zDarkGray": router.pathname.includes(
                                  route.baseRoute,
                                ),
                              })}
                            >
                              {route.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="">
                              <ul className="grid w-[400px] gap-3 bg-zBlack p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {route.routes?.map((subRoute) => (
                                  <ListItem
                                    key={subRoute.name}
                                    href={subRoute.href}
                                    title={subRoute.name}
                                  >
                                    {subRoute.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <Link href={route.baseRoute} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zDarkGray hover:text-zWhite",
                                {
                                  "bg-zDarkGray": router.pathname.includes(
                                    route.baseRoute,
                                  ),
                                },
                              )}
                            >
                              {route.name}
                            </NavigationMenuLink>
                          </Link>
                        )}
                      </NavigationMenuItem>
                    </div>
                  ))}
                </div>
              </NavigationMenuList>
            </NavigationMenu>
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
            <NavigationMenu>
              <NavigationMenuList>
                <div className="ml-10 mt-2 flex flex-col space-y-2">
                  {navbarRoutes.map((route) => (
                    <>
                      {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem> */}
                      <NavLink
                        key={`mobile-${route.name}`}
                        href={route.baseRoute}
                        isActive={router.pathname === route.baseRoute}
                        target={route.target || "_self"}
                      >
                        <button onClick={toggleMenu}>{route.name}</button>
                      </NavLink>
                    </>
                  ))}
                </div>
              </NavigationMenuList>
            </NavigationMenu>
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
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none text-zWhite no-underline outline-none transition-colors hover:bg-zDarkGray focus:bg-zDarkGray",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
