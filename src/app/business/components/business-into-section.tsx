import type { FC } from "react";
import ImageWithCredit from "~/components/layout/image-with-credit";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";

const BusinessIntoSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle className="-mb-4" center>
        Välkommen till ArgZ
      </SectionTitle>
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
      <ImageWithCredit
        alt="image"
        className="col-span-3 grid place-items-center"
        height={500}
        imageClassName="rounded max-w-3xl"
        photoCommittee="zFoto"
        photographer="Casper Lundberg"
        src="/argz.jpg"
        width={3000}
      />
    </SectionWrapper>
  );
};

export default BusinessIntoSection;
