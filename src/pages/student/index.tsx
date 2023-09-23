import type { NextPage } from "next";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const StudentPage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Student" />
      <SectionWrapper>
        <SectionTitle className="w-full">Student</SectionTitle>
        <p>
          Som student på Z har du tillgång till flera olika tjänster och annat.
          Du kan till exempel boka Zaloonen om du vill ha en fest eller något
          annat kul.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 my-4 rounded border transition-all hover:scale-105">
            <Link href="/student/studentHealth">
              <SecondaryTitle center={true}>Studenthälsa</SecondaryTitle>
              <p className="mx-4">
                Här kan man skriva något om att man kan få hjälp om man inte mår
                så bra eller vill klaga på skolans lokaler
              </p>
            </Link>
          </div>
          <div className="col-span-1 my-4 rounded border transition-all hover:scale-105">
            <Link href="/student/zaloonen">
              <SecondaryTitle center={true}>Zaloonen</SecondaryTitle>
              <p className="mx-4">
                Zaloonen är vår sektionslokal, klicka här för att boka den
              </p>
            </Link>
          </div>
          <div className="col-span-1 my-4 rounded border transition-all hover:scale-105">
            <Link href="/student/new_student">
              <SecondaryTitle center={true}>Söka Z?</SecondaryTitle>
              <p className="mx-4">
                Funderar du på om Z är rätt pogram för dig? Klicka här isåfall!
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

export default StudentPage;
