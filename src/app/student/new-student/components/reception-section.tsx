import Link from "next/link";
import type { FC } from "react";
import ImageWithCredit from "~/components/layout/image-with-credit";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/utils";

export const ReceptionSection: FC = () => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3">
        <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
          <SectionTitle className="mb-4">Mottagningen</SectionTitle>
          <p className="mr-0 md:mr-12">
            Mottagningen syftar till att underlätta din integration både socialt
            och akademiskt. Detta åstadkoms genom fyra intensiva veckor av
            engagerande aktiviteter. Genom varierande aktiviteter får du
            möjlighet att lära känna dina medstudenter på sektionen. Det
            viktigaste är att du närmar dig denna period med en positiv
            inställning och är redo att njuta av varje stund! Det är normalt att
            känna nervositet inför mottagningen, men kom ihåg att du inte är
            ensam. Mottagningskommiten och deras phaddrar kommer göra sitt bästa
            för att se till att din mottagning blir fantastisk, men det är du
            som formar din egen upplevelse. Så kom med ett öppet sinne och var
            redo att ha roligt!
          </p>
          <div className="mr-0 mt-8 grid grid-cols-2 gap-8 md:mr-2">
            <div className="border-gradient col-span-2 rounded-lg md:col-span-1">
              <h3 className="mb-4 text-xl font-semibold">
                Samling på Götaplatsen första dagen
              </h3>
              <p>
                Första dagen är det samling på Götaplatsen. Efter en festlig
                välkomstceremoni tågar alla tillsammans upp till Chalmers
                campus. Därefter börjar mottagningen. Håll utkik i brevlådan för
                ditt antagningsbesked eller gå in på{" "}
                <StyledLink href={"https://www.chalmers.se/utbildning/"}>
                  Chalmers hemsida
                </StyledLink>{" "}
                för att se när terminen börjar.
              </p>
            </div>
            <div className="border-gradient col-span-2 rounded-lg md:col-span-1">
              <h3 className="mb-4 text-xl font-semibold">Redan antagen?</h3>
              <p>
                Tryck på denna knapp om du är antagen för mer information från
                vår mottagningskommitté.
              </p>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mx-auto mt-4 block w-fit",
                )}
                href="https://www.znollk.se/"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Antagen
              </Link>
            </div>
          </div>
        </div>
        <ImageWithCredit
          alt="Nollbricka som görs på mottagningen"
          className="order-last col-span-3 m-auto mt-4 lg:order-last lg:col-span-1 lg:mt-0"
          height={400}
          photoCommittee="zFoto"
          photographer="Dennis Holmström"
          src="/nollbricka.jpg"
          width={400}
        />
      </div>
    </SectionWrapper>
  );
};
