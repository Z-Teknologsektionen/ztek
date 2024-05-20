import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import StyledLink from "~/components/layout/styled-link";

const BusinessContactFooter: FC = () => {
  return (
    <SectionTitle className="mb-8 text-center">
      Intresserad? Kontakta oss på{" "}
      <StyledLink href="mailto:foretag@argz.se">foretag@argz.se</StyledLink>{" "}
      eller gå in på vår hemsida{" "}
      <StyledLink href="https://www.argz.se/" target="_blank">
        ArgZ.se
      </StyledLink>
    </SectionTitle>
  );
};

export default BusinessContactFooter;
