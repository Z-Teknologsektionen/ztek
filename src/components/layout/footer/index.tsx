import { type FC } from "react";
import { FooterContactSection } from "./footer-contact-section";
import { FooterQuickLinks } from "./footer-quick-links";
import { FooterStudentkar } from "./footer-studentkar";
import { FooterZtyretInfo } from "./footer-ztyret-info";

const Footer: FC = () => {
  return (
    <footer className="bg-zBlack pb-2 pt-8 text-zWhite">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between px-4 md:px-6 lg:px-8">
          <FooterZtyretInfo />
          <FooterStudentkar />
          <FooterQuickLinks />
        </div>
        <FooterContactSection />
      </div>
    </footer>
  );
};

export default Footer;
