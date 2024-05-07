import { Suspense, type FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";
import {
  ProgramManagerImage,
  ProgramManagerImageSkeleton,
} from "./program-manager-image";

const ProgramManagerSection: FC = () => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3">
        <div className="order-last col-span-3 m-auto lg:order-first lg:col-span-1">
          <Suspense fallback={<ProgramManagerImageSkeleton />}>
            <ProgramManagerImage />
          </Suspense>
        </div>
        <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
          <SectionTitle className="mb-4">En bra kombination</SectionTitle>
          <p>
            Z-programmet är en unik utbildning som erbjuder en bra kombination
            av elektro-, maskin- och datateknik. Genom att sammanföra dessa tre
            discipliner skapas en utbildningsmiljö där studenter får en bred
            kunskapsbas och en djup förståelse för teknikens olika aspekter.
            Inom automation och mekatronik får studenter möjlighet att utforska
            och integrera avancerade teknologier inom elektronik,
            maskinkonstruktion och dataprogrammering. Genom att lära sig att
            designa och implementera smarta och effektiva system kan de möta
            framtidens utmaningar inom industriell automation och robotik.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border-gradient rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Elektroteknik</h3>
              <p>
                Elektroteknikens kunskaper ger studenterna en grundläggande
                förståelse för elektroniska kretsar, mätningar och
                styrningssystem. Detta ger en bra grund inför kommande kurser
                inom reglerteknik.
              </p>
            </div>
            <div className="border-gradient rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Maskinteknik</h3>
              <p>
                Maskintekniken ger studenter förmågan att designa och utveckla
                mekaniska system och komponenter, från idé till färdig produkt.
              </p>
            </div>
            <div className="border-gradient rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Datateknik</h3>
              <p>
                Datatekniken ger teknologer verktygen för att programmera och
                hantera data för att optimera och automatisera processer. Det
                förbereder också studenterna inför kommande utmaningar inom AI
                och datavetenskap.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p>
        Genom att kombinera dessa discipliner kan studenter inom automation och
        mekatronik skapa innovativa lösningar för att förbättra produktiviteten,
        effektiviteten och säkerheten i industriella och tekniska tillämpningar.
        De blir väl rustade att arbeta inom en rad olika branscher, såsom
        tillverkning, automation, fordonsindustrin och forskning. På Chalmers
        erbjuds studenter inom automation och mekatronik en dynamisk och
        stimulerande utbildningsmiljö, där de får möjlighet att delta i projekt
        och laborationer, samarbeta med forskare och experter inom området och
        utforska den senaste tekniken inom automation och mekatronik. Studenter
        vid Z-programmet kan välja på 21 olika mastrar, varav en ägs av Z,&nbsp;
        <StyledLink
          href="https://www.chalmers.se/en/education/find-masters-programme/systems-control-and-mechatronics-msc/"
          target="_blank"
        >
          Systemteknik, reglerteknik och mekatronik
        </StyledLink>
        .
      </p>
    </SectionWrapper>
  );
};

export default ProgramManagerSection;
