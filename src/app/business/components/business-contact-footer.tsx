import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";

const BusinessContactFooter: FC = () => {
  return (
    <SectionTitle>
      Intresserad? Kontakta oss på{" "}
      <a
        className="text-blue-500 hover:underline"
        href="mailto:foretag@argz.se"
      >
        foretag@argz.se
      </a>{" "}
      eller gå in på vår hemsida{" "}
      <a
        className="text-blue-500 hover:underline"
        href="https://www.argz.se/"
        rel="noopener noreferrer"
        target="_blank"
      >
        ArgZ.se
      </a>
    </SectionTitle>
  );
};

export default BusinessContactFooter;
