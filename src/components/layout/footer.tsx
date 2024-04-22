"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { MdBusiness, MdEmail, MdOutlineHouse } from "react-icons/md";
import { useFooterQuickLinks } from "~/hooks/useFooterQuickLinks";

const Footer: FC = () => {
  const footerQuickLinks = useFooterQuickLinks();

  return (
    <footer className="bg-zBlack pb-2 pt-8 text-zWhite">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between px-4 md:px-6 lg:px-8">
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-left">
            <h3 className="text-lg font-semibold underline">Kontakta Ztyret</h3>
            <ul className="mt-2">
              <li className="mb-2 flex items-center justify-center md:justify-start">
                <MdEmail className="mr-2" />
                <a className="hover:underline" href="mailto:ztyret@ztek.se">
                  ztyret@ztek.se
                </a>
              </li>
              <li className="mb-2 flex items-center justify-center md:justify-start">
                <MdOutlineHouse className="mr-2" />
                <a
                  className="hover:underline"
                  href="http://maps.google.com/?q=Hörsalsvägen 7, 412 96 Göteborg"
                  target="_blank"
                >
                  Hörsalsvägen 7, 412 96 Göteborg
                </a>
              </li>
              <li className="mb-2 flex items-center justify-center md:justify-start">
                <MdBusiness className="mr-2" />
                Organisationsnummer: 857209-1331
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col items-center md:w-1/3">
            <h3 className="text-center text-lg font-semibold">En del av</h3>
            <a
              className="transition-all hover:opacity-75"
              href="https://chalmersstudentkar.se/"
              target="_blank"
            >
              <Image
                alt="CHS logo"
                className="h-32 w-72 rounded-lg object-contain"
                height={300}
                src="/CHS-standard-RGB-white.png"
                width={300}
              />
            </a>
          </div>
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-right">
            <h3 className="align-text-top text-lg font-semibold underline">
              Snabba länkar
            </h3>
            <ul className="mt-2 content-center">
              {footerQuickLinks.map((link) => (
                <li key={link.text} className="mb-2">
                  <Link
                    className="hover:underline"
                    href={link.href}
                    onClick={
                      link.text === "Logga ut"
                        ? () => signOut({ callbackUrl: "/", redirect: true })
                        : undefined
                    }
                    target={link.blank ? "_blank" : "_self"}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center text-xs">
          <p>
            Hemsidan är utvecklad av Webbgruppen, sektionens viktigaste organ.
          </p>
          <a className="m-0 hover:underline" href="mailto:webbgruppen@ztek.se">
            webbgruppen@ztek.se
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
