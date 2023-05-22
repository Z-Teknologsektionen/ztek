import Image from "next/image";
import type { FC } from "react";

import { MdBusiness, MdEmail, MdOutlineHouse } from "react-icons/md";

const Footer: FC = () => {
  return (
    <footer className="bg-zBlack py-10 text-zWhite">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-left">
            <h3 className="text-lg font-semibold">Kontakta Ztyret</h3>
            <ul className="mt-6">
              <li className="mb-2 flex items-center">
                <MdEmail className="mr-2" />
                <a href="mailto:ztyret@ztek.se">ztyret@ztek.se</a>
              </li>
              <li className="mb-2 flex items-center">
                <MdOutlineHouse className="mr-2" />
                <a
                  href="http://maps.google.com/?q=Hörsalsvägen 7, 412 96 Göteborg"
                  target="_blank"
                >
                  Hörsalsvägen 7, 412 96 Göteborg
                </a>
              </li>
              <li className="mb-2 flex items-center">
                <MdBusiness className="mr-2" />
                Organisationsnummer: 857209-1331
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-center text-lg font-semibold">En del av</h3>
            <a href="https://chalmersstudentkar.se/" target="_blank">
              <div className="relative">
                {/* height and width controlled by the className, not the variables. */}
                <Image
                  alt="CHS logo"
                  className="h-full w-full rounded-lg object-contain"
                  height={500}
                  src="/CHS-standard-RGB-white.png"
                  width={500}
                />
              </div>
            </a>
          </div>
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-right">
            <h3 className="align-text-top text-lg font-semibold">
              Snabba länkar
            </h3>
            <ul className="mt-6 content-center">
              <li className="mb-2">
                <a href="https://chalmers.instructure.com/" target="_blank">
                  Canvas
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://cloud.timeedit.net/chalmers/web/public/"
                  target="_blank"
                >
                  TimeEdit
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://cloud.timeedit.net/chalmers/web/b1/"
                  target="_blank"
                >
                  Boka grupprum
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.chalmers.se/utbildning/hitta-program/automation-och-mekatronik-civilingenjor/"
                  target="_blank"
                >
                  Information om programmet
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-center text-xs">
          <p>
            Hemsidan är utvecklad av Webbgruppen, sektionens viktigaste organ.
          </p>
          <a href="mailto:webbgruppen@ztek.se">webbgruppen@ztek.se</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
