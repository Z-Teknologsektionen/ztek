import Image from "next/image";
import type { FC } from "react";
import { MdEmail, MdInfo } from "react-icons/md";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

export const FunkaSection: FC = () => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 py-8">
        <div className="col-span-3 md:col-span-2 md:pl-20">
          <SectionTitle className="break-words pb-4">
            Pedagogiskt stöd för dig med funktionsnedsättning
          </SectionTitle>
          <p>
            FUNKA på Chalmers erbjuder pedagogiskt stöd för studenter med
            funktionsnedsättning. De erbjuder olika typer av stöd för att
            underlätta dina studier. Dessa stöd inkluderar bland annat extra tid
            på tentor, anteckningsstöd, tekniska hjälpmedel och anpassade
            studiematerial. För att få tillgång till detta stöd behöver du ett
            intyg som styrker din funktionsnedsättning. Du kan läsa mer om detta
            på Chalmers hemsida.
          </p>
          <ul className="mt-6">
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdEmail className="mr-2" />
              <a
                className="hover:underline"
                href="mailto:pedagogisktstod@chalmers.se"
              >
                pedagogisktstod@chalmers.se
              </a>
            </li>
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdInfo className="mr-2" />
              <a
                className="hover:underline"
                href="https://www.chalmers.se/utbildning/studentstod/pedagogiskt-stod-for-dig-med-funktionsnedsattning/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Mer information om pedagogiskt stöd
              </a>
            </li>
          </ul>
        </div>
        <div className="order-last col-span-3 m-auto lg:order-first lg:col-span-1">
          <a
            href="https://www.chalmers.se/utbildning/studentstod/pedagogiskt-stod-for-dig-med-funktionsnedsattning/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Funka"
              className="rounded"
              height={400}
              src="/funka-logo-pattern-8.png"
              width={400}
            />
          </a>
          <p className="text-center">Funka på Chalmers</p>
        </div>
      </div>
    </SectionWrapper>
  );
};
