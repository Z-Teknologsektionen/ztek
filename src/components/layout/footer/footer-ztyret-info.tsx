import type { FC } from "react";
import { MdBusiness, MdEmail, MdOutlineHouse } from "react-icons/md";

export const FooterZtyretInfo: FC = () => {
  return (
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
  );
};
