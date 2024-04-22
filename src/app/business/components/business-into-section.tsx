import Image from "next/image";
import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";

const BusinessIntoSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Välkommen till ArgZ</SectionTitle>
      <p>
        ArgZ är Automation och Mekatroniks arbetsmarknadsgrupp. För de flesta är
        studierna på Chalmers den sista anhalten innan steget ut i arbetslivet
        tas på allvar. Det är därför viktigt att studenterna ges möjligheten att
        bilda sig en uppfattning om det som komma skall. För att kunna erbjuda
        ett smakprov av framtiden arbetar ArgZ med att skapa tillfällen där
        företag och studenter får möjlighet att skapa kontakt med varandra. Det
        kan exempelvis vara i form av företagspresentationer, studiebesök eller
        case-kvällar. Dessutom anordnar vi varje år arbetsmarknadsdagen ZMART.
        ArgZ förmedlar den unika kompetens som studenter på Automation och
        Mekatronik besitter till potentiella arbetsgivare, samtidigt får företag
        chansen att marknadsföra sig och skapa en långsiktig rekryteringsbas.
        Kontakta oss på{" "}
        <StyledLink href="mailto:foretag@argz.se">foretag@argz.se</StyledLink>{" "}
        eller gå in på vår hemsida{" "}
        <StyledLink href="https://www.argz.se/" target="_blank">
          ArgZ.se
        </StyledLink>
      </p>
      <br></br>
      <div className="col-span-3">
        <Image
          alt="image"
          className="rounded"
          height={300}
          src="/argz.jpg"
          width={4000}
        />
        <div className="mt-2 text-center">
          <p>Foto: Casper Lundberg/zFoto</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BusinessIntoSection;
