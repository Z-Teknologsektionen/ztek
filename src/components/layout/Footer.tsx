import Image from "next/image";
import Link from "next/link";
// import chsLogo from "public/CHS-standard-RGB-white.png";
import type { FC } from "react";

import { MdBusiness, MdEmail, MdOutlineHouse } from "react-icons/md";

const Footer: FC = () => {
  return (
    <footer className="bg-zBlack pb-2 pt-8 text-zWhite">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between px-4 md:px-6 lg:px-8">
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-left">
            <h3 className="text-lg font-semibold underline">Kontakta Ztyret</h3>
            <ul className="mt-6">
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
            <a href="https://chalmersstudentkar.se/" target="_blank">
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
            <ul className="mt-6 content-center">
              <li className="mb-2">
                <a
                  className="hover:underline"
                  href="https://chalmers.instructure.com/"
                  target="_blank"
                >
                  Canvas
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="hover:underline"
                  href="https://cloud.timeedit.net/chalmers/web/public/"
                  target="_blank"
                >
                  TimeEdit
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="hover:underline"
                  href="https://cloud.timeedit.net/chalmers/web/b1/"
                  target="_blank"
                >
                  Boka grupprum
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="hover:underline"
                  href="https://www.chalmers.se/utbildning/hitta-program/automation-och-mekatronik-civilingenjor/"
                  target="_blank"
                >
                  Information om programmet
                </a>
              </li>
              <li className="mb-2">
                <Link className="hover:underline" href="/admin">
                  Logga in
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-center text-xs">
          <p>
            Hemsidan är utvecklad av Webbgruppen, sektionens viktigaste organ.
          </p>
          <a className="hover:underline" href="mailto:webbgruppen@ztek.se">
            webbgruppen@ztek.se
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
