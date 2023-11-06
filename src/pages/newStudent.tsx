import type { NextPage } from "next";
import Image from "next/image";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";

const NewStudent: NextPage = () => {
  return (
    <>
      <HeadLayout title="Ny Student" />
      <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper>
          <div className="grid grid-cols-3">
            <div className="order-last col-span-3 m-auto lg:order-first lg:col-span-1">
              <Image
                alt="image"
                className="rounded"
                height={400}
                src="/knut.jpg"
                width={400}
              />
              <div className="mt-2 text-center">
                <p>
                  <strong>Knut Åkessons</strong> - programansvarig
                </p>
                <a
                  className="hover:font-bold hover:text-zRed"
                  href="mailto:knut@chalmers.se"
                >
                  knut@chalmers.se
                </a>
              </div>
            </div>
            <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
              <SectionTitle className="mb-4">En bra kombination</SectionTitle>
              <p>
                Z-programmet är en unik utbildning som erbjuder en bra
                kombination av elektro-, maskin- och datateknik. Genom att
                sammanföra dessa tre discipliner skapas en utbildningsmiljö där
                studenter får en bred kunskapsbas och en djup förståelse för
                teknikens olika aspekter. Inom automation och mekatronik får
                studenter möjlighet att utforska och integrera avancerade
                teknologier inom elektronik, maskinkonstruktion och
                dataprogrammering. Genom att lära sig att designa och
                implementera smarta och effektiva system kan de möta framtidens
                utmaningar inom industriell automation och robotik.
                {/* TODO: Skriv om masterprogram osv */}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Elektroteknik</h3>
                  <p>
                    Elektroteknikens kunskaper ger studenterna en grundläggande
                    förståelse för elektroniska kretsar, mätningar och
                    styrningssystem. Detta ger en bra grund inför kommande
                    kurser inom reglerteknik.
                  </p>
                </div>
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Maskinteknik</h3>
                  <p>
                    Maskintekniken ger studenter förmågan att designa och
                    utveckla mekaniska system och komponenter, från idé till
                    färdig produkt.
                  </p>
                </div>
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Datateknik</h3>
                  <p>
                    Datatekniken ger teknologer verktygen för att programmera
                    och hantera data för att optimera och automatisera
                    processer. Det förbereder också studenterna inför kommande
                    utmaningar inom AI och datavetenskap.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p>
            Genom att kombinera dessa discipliner kan studenter inom automation
            och mekatronik skapa innovativa lösningar för att förbättra
            produktiviteten, effektiviteten och säkerheten i industriella och
            tekniska tillämpningar. De blir väl rustade att arbeta inom en rad
            olika branscher, såsom tillverkning, automation, fordonsindustrin
            och forskning. På Chalmers erbjuds studenter inom automation och
            mekatronik en dynamisk och stimulerande utbildningsmiljö, där de får
            möjlighet att delta i projekt och laborationer, samarbeta med
            forskare och experter inom området och utforska den senaste tekniken
            inom automation och mekatronik. Studenter vid Z-programmet kan välja
            på 21 olika mastrar, varav en ägs av Z,&nbsp;
            <a
              className="text-blue-600 hover:underline dark:text-blue-500"
              href="https://www.chalmers.se/en/education/find-masters-programme/systems-control-and-mechatronics-msc/"
              target="_blank"
            >
              Systemteknik, reglerteknik och mekatronik
            </a>
            .
          </p>
        </SectionWrapper>
        <SectionWrapper>
          <div className="grid grid-cols-3">
            <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
              <SectionTitle className="mb-4">Mottagningen</SectionTitle>
              <p>
                Målet med mottagningen är att hjälpa dig komma in i det sociala
                livet såväl som studierna. Den består av fyra veckor med roliga
                aktiviteter: allt från häfv och häfv till fester och sittningar.
                Du kommer få lära känna andra z-teknologer, genom roliga
                aktiviteter och phaddergrupper. Men viktigast av allt är att
                komma med ett leende på läpparna och vara redo att ha kul
                tillsammans! Det är naturligt att vara nervös inför
                mottagningen, så kom ihåg att du inte är ensam i det. ZnollK
                kommer göra vårt bästa för att mottagningen ska bli helt
                fantastisk för dig, men det är du som gör den till vad den blir
                för dig. Så kom med ett öppet sinne och var redo att ha kul!
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-2">
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">
                    Samling på Götaplatsen första dagen
                  </h3>
                  <p>
                    Första dagen, 15 augusti 2023, är det samling på
                    Götaplatsen. Efter en festlig välkomstceremoni tågar alla
                    tillsammans upp till Chalmers campus.
                  </p>
                </div>
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Redan antagen?</h3>
                  <p>
                    Tryck på denna knapp om du är antagen för mer information
                  </p>
                  <Button className="mx-auto block" variant="outline">
                    Antagen
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-last col-span-3 m-auto lg:order-last lg:col-span-1">
              <Image
                alt="image"
                className="rounded"
                height={400}
                src="/nollbricka.jpg"
                width={400}
              />
              <div className="mt-2 text-center">
                <p>
                  <strong>Dennis Holmström</strong> /zFoto
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle className="text-center">Kurser</SectionTitle>
          <p className="text-center">
            De tre första åren kommer du spendera med att läsa
          </p>
          <div className="order-first col-span-3 pl-4">
            <div className="flex flex-wrap justify-center">
              <div className="m-5 flex h-full justify-center rounded-lg px-2 py-2 shadow lg:w-1/4 xl:w-1/4">
                <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-center font-semibold dark:text-gray-400 md:text-lg">
                      Årskurs 1
                    </dt>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 1
                    </dt>
                    <dd className="text-lg ">
                      <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                        <li>Inledande matematik</li>
                        <li>Inledande programmering</li>
                        <li>Introduktion till automation och mekatronik</li>
                      </ul>
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 2
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 3
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 4
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                </dl>
              </div>
              <div className="m-5 flex h-full justify-center rounded-lg px-2 py-2 shadow lg:w-1/4 xl:w-1/4">
                <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-center font-semibold dark:text-gray-400 md:text-lg">
                      Årskurs 2
                    </dt>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 1
                    </dt>
                    <dd className="text-lg ">
                      <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                        <li>Inledande matematik</li>
                        <li>Inledande programmering</li>
                        <li>Introduktion till automation och mekatronik</li>
                      </ul>
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 2
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 3
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 4
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                </dl>
              </div>
              <div className="m-5 flex h-full justify-center rounded-lg px-2 py-2 shadow lg:w-1/4 xl:w-1/4">
                <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-center font-semibold dark:text-gray-400 md:text-lg">
                      Årskurs 3
                    </dt>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 1
                    </dt>
                    <dd className="text-lg ">
                      <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                        <li>Inledande matematik</li>
                        <li>Inledande programmering</li>
                        <li>Introduktion till automation och mekatronik</li>
                      </ul>
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 2
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 3
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Läsperiod 4
                    </dt>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                      <li>Inledande matematik</li>
                      <li>Inledande programmering</li>
                      <li>Introduktion till automation och mekatronik</li>
                    </ul>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default NewStudent;
