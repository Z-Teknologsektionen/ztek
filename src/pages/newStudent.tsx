import type { NextPage } from "next";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const NewStudent: NextPage = () => {
  return (
    <>
      <HeadLayout title="Ny Student" />
      <SectionWrapper>
        <div className="text-center">
          <SectionTitle className="pb-4">Ny på Z</SectionTitle>
          <div className="flex h-28 items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold">Årskurs 1</h1>
              <h2 className="text-center font-bold">
                Första året på Automation och Mekatronik-programmet på Chalmers
                tekniska högskola innehåller en hel del matematik, med inslag av
                programmering, elektronik och mekanik. Här är en lista över
                kurser som du kan förvänta dig att läsa under ditt första år:
              </h2>
            </div>
          </div>
          <div className="divide-2 mt-8 grid grid-cols-4 divide-x divide-y divide-black border-2 border-black">
            <div className="text-size-10 bg-gray-100 p-4">
              <p>Läsperiod 1</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Läsperiod 2</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Läsperiod 3</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Läsperiod 4</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="col-span-2 bg-gray-100 p-4">
              <ul className="">
                <li>Introduktion till automation och mekatronik</li>
              </ul>
            </div>
            <div className="col-span-2 bg-gray-100 p-4">
              <ul className="">
                <li>Grundläggande datorteknik</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p></p>
              <ul className="">
                <li>Inledande programmering</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Elektriska kretsar</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Mekanik 1</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Maskinorienterad Programmering</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Inledande matematik</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Matematisk analys i en varaibel</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Linjär Algebra</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4">
              <p>Matematisk analys i flera variabler</p>
              <ul className="">
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default NewStudent;
