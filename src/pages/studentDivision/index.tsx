import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const StudentDivisionPage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Sektionen" />
      <SectionWrapper>
        <SectionTitle className="w-full">Sektionen</SectionTitle>
        <p>
          Z-teknologsektionen e najs, här finns lite olika funktioner. Skriv om
          azpning
        </p>
        <div className="grid grid-cols-2 justify-items-center gap-4">
          <div className="col-span-1 my-4  transition-all hover:opacity-75">
            <Link href="/studentDivision/zaloonen">
              <SecondaryTitle center={true}>Zaloonen</SecondaryTitle>
              <p className="mx-4">Information om zaloonen</p>
            </Link>
          </div>
          <div className="col-span-1 mx-auto my-4 transition-all hover:opacity-95">
            <Link href="/student/new_student">
              <SecondaryTitle center={true}>Sektionsorgan</SecondaryTitle>
              <Image
                alt={"Bild på DaltonZ"}
                height={1000}
                quality={100}
                src="/sektionsorgan.jpg"
                width={1000}
              />
              <p className="mx-4">
                Undrar du vilka olika organ som sektionen har? Här kan du läsa
                mer om de olika organen på sektionen.
              </p>
            </Link>
          </div>
          <div className="col-span-1 my-4 rounded border transition-all hover:scale-105">
            <Link href="https://snz.se/" target={"_blank"}>
              <SecondaryTitle center={true}>
                Påverka dina studier
              </SecondaryTitle>
              <p className="mx-4">Studienämnden löser</p>
            </Link>
          </div>
        </div>

        {/* 
        Vad vill jag ha här?
        Studiehälsa
        Zaloonen 
        SNZ-bös */}
      </SectionWrapper>
    </>
  );
};

export default StudentDivisionPage;
