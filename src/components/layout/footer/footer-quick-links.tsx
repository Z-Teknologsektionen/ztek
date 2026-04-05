"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type FC } from "react";
import { footerQuickLinks } from "~/data/footer-quick-links";

export const FooterQuickLinks: FC = () => {
  const { status } = useSession();

  return (
    <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-right">
      <h3 className="align-text-top text-lg font-semibold underline">
        Snabba länkar
      </h3>
      <ul className="mt-2 content-center">
        {status === "authenticated" ? (
          <li className="mb-2">
            <Link
              className="hover:underline"
              href="/"
              onClick={() => void signOut({ callbackUrl: "/", redirect: true })}
            >
              Logga ut
            </Link>
          </li>
        ) : (
          <li className="mb-2">
            <Link className="hover:underline" href="/active">
              Logga in
            </Link>
          </li>
        )}
        {footerQuickLinks.map((link) => (
          <li key={link.text} className="mb-2">
            <Link
              className="hover:underline"
              href={link.href}
              target={link.blank ? "_blank" : "_self"}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
