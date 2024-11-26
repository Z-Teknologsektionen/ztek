import Image from "next/image";
import Link from "next/link";
import { Suspense, type FC } from "react";
import { MdEmail, MdInfo, MdPhone, MdReport } from "react-icons/md";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { StudentCounselorCard } from "./student-counselor-card";

export const StudentHealthSection: FC = () => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 py-8">
        <div className="col-span-3 md:col-span-2 md:pr-20">
          <SectionTitle className="pb-4">Studenthälsa</SectionTitle>
          <p>
            Som student på Z och på Chalmers är det viktigt att känna sig säker
            och må bra, vilket inte alltid är lätt. Det är viktigt att känna
            till att som medlem i Chalmers Studentkår finns Kåren alltid som ett
            stöd. Som medlem i Kåren har du tillgång till samtal med Kurator,
            Präst, Feelgood Studenthälsa, Studievägledare m.m. Trygg på Chalmers
            är även bra att känna till då de hanterar incidenter och kan hjälpa
            dig som blivit utsatt för eller sett och upplevt trakasserier på
            Chalmers. Att rapportera incidenter till Trygg på Chalmers är
            viktigt då det hjälper studentkåren att förebygga samt föra
            statistik på vad som händer på högskolan. Skulle man inte vilja
            vända sig till högskolan eller centrala kåren så kan man också vända
            sig till SAMO här på sektionen.
          </p>
        </div>
        <div className="col-span-3 mx-auto mt-4 md:col-span-1 md:my-auto">
          <Link
            href="https://chalmersstudentkar.se/feel_safe/"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <Image
              alt="image"
              className="rounded transition-all hover:opacity-75"
              height={500}
              src="/feeling_safe_student_union.png"
              width={500}
            />
          </Link>
          <p className="mt-4 text-center">Kårens hemsida om studenthälsa</p>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center py-2 sm:grid-cols-2 md:grid-cols-3">
        <div className="col-span-1">
          <SecondaryTitle>Trygg på Chalmers</SecondaryTitle>
          <ul className="mt-6">
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdInfo className="mr-2" />
              <Link
                className="hover:underline"
                href="https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                Mer information
              </Link>
            </li>
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdReport className="mr-2" />
              <Link
                className="hover:underline"
                href="https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/rapportera-en-handelse/"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                Rapportera en händelse
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <SecondaryTitle>Sociala enhetens ordförande</SecondaryTitle>
          <ul className="mt-6">
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdEmail className="mr-2" />
              <a
                className="hover:underline"
                href="mailto:so@chalmersstudentkar.se"
              >
                so@chalmersstudentkar.se
              </a>
            </li>
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdPhone className="mr-2" />
              <a className="hover:underline" href="tel:031-772 39 18">
                031-772 39 18
              </a>
            </li>
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdInfo className="mr-2" />
              <Link
                className="hover:underline"
                href="https://chalmersstudentkar.se/feel_safe/"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                Mer information från kåren
              </Link>
            </li>
          </ul>
        </div>
        <Suspense>
          <StudentCounselorCard />
        </Suspense>
      </div>
    </SectionWrapper>
  );
};
