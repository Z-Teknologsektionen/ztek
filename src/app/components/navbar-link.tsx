import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  target: string;
}

const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({
  href,
  isActive,
  target,
  children,
}) => {
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

export default NavLink;
