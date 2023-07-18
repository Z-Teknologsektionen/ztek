import type { NextPage } from "next";
import Image from "next/image";
const AboutPage: NextPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
          <h1 className="pb-8 text-3xl font-bold">Om oss</h1>

          <div className="grid grid-cols-3 py-8">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <h2 className="mb-4 text-2xl font-semibold">Vår historia</h2>
              <p>
                På höstterminen 1986 startades civilingenjörsprogrammet
                Automatiseringsteknik upp av Bengt-Erik Bengtsson (BEB), IVF och
                ett antal industriföretag för att utbilda tekniker med en bred
                bas inom elektroteknik, datateknik och maskinteknik. Då
                bokstaven ”A” redan var upptagen av arkitektprogrammet valdes
                bokstaven ”Z” till att representera programmet (en kort tid
                under första året användes även ”R” - för robot, men det
                övergavs snabbt). Utbildningen hade från början 30 platser som
                utökades till 60 platser 1993 och vidare till 90 platser 1998.
                2001 bytte utbildningsprogrammet namn till Automation och
                Mekatronik. Sektionens maskot är Lucky Luke och sektionsfärgen
                är alla nyanser av grå.
              </p>
            </div>
            <div className="m-auto hidden md:block">
              <Image alt="image" height={250} src="/logo.png" width={250} />
              <p className="mt-4 text-center font-bold">
                Z-teknologsektionens logga
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 py-16">
            <div className="col-span-1 m-auto hidden md:block">
              <Image
                alt="image"
                className="rounded-full"
                height={300}
                src="/knut.png"
                width={300}
              />
              <div className="mt-4 text-center">
                <p>
                  <strong>Knut Åkesson</strong> - programansvarig
                </p>
                <a
                  className="hover:font-bold hover:text-zRed"
                  href="mailto:knut@chalmers.se"
                >
                  knut@chalmers.se
                </a>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2">
              <h2 className="pb-4 text-2xl font-semibold">
                En bra kombination
              </h2>
              <p>
                Z-programmet är en unik utbildning som erbjuder en bra
                kombination av elektro-, maskin- och datateknik. Genom att
                sammanföra dessa tre discipliner skapas en holistisk
                utbildningsmiljö där studenter får en bred kunskapsbas och en
                djup förståelse för teknikens olika aspekter. Inom automation
                och mekatronik får studenter möjlighet att utforska och
                integrera avancerade teknologier inom elektronik,
                maskinkonstruktion och dataprogrammering. Genom att lära sig att
                designa och implementera smarta och effektiva system kan de möta
                framtidens utmaningar inom industriell automation och robotik.
                {/* TODO: Skriv om masterprogram osv */}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3">
                <div className="border-gradient rounded-lg p-8">
                  <h3 className="mb-4 text-xl font-semibold">Elektroteknik</h3>
                  <p>
                    Elektroteknikens kunskaper ger studenterna en grundläggande
                    förståelse för elektroniska kretsar, mätningar och
                    styrningssystem. Detta ger en bra grund inför kommande
                    kurser inom reglerteknik.
                  </p>
                </div>
                <div className="border-gradient rounded-lg p-8">
                  <h3 className="mb-4 text-xl font-semibold">Maskinteknik</h3>
                  <p>
                    Maskintekniken ger studenter förmågan att designa och
                    utveckla mekaniska system och komponenter, från idé till
                    färdig produkt.
                  </p>
                </div>
                <div className="border-gradient rounded-lg p-8">
                  <h3 className="mb-4 text-xl font-semibold">Datateknik</h3>
                  <p>
                    Datatekniken ger teknologer verktygen för att programmera
                    och hantera data för att optimera och automatisera
                    processer. Det förbereder också studenterna inför kommande
                    utmaningar inom AI och datavetenskap.
                  </p>
                </div>
              </div>
              <p>
                Genom att kombinera dessa discipliner kan studenter inom
                automation och mekatronik skapa innovativa lösningar för att
                förbättra produktiviteten, effektiviteten och säkerheten i
                industriella och tekniska tillämpningar. De blir väl rustade att
                arbeta inom en rad olika branscher, såsom tillverkning,
                automation, fordonsindustrin och forskning. På Chalmers erbjuds
                studenter inom automation och mekatronik en dynamisk och
                stimulerande utbildningsmiljö, där de får möjlighet att delta i
                projekt och laborationer, samarbeta med forskare och experter
                inom området och utforska den senaste tekniken inom automation
                och mekatronik. Studenter vid Z-programmet kan välja på 21 olika
                mastrar, varav en ägs av Z,&nbsp;
                <a
                  className="text-blue-600 hover:underline dark:text-blue-500"
                  href="https://www.chalmers.se/en/education/find-masters-programme/systems-control-and-mechatronics-msc/"
                  target="_blank"
                >
                  Systemteknik, reglerteknik och mekatronik
                </a>
                .
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 py-8">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <h2 className="mb-4 text-2xl font-semibold">Sektionen</h2>
              <p>
                Sektionen leds av Sektionsstyrelsen, Ztyret, som består av 6
                förtroendevalda. De förtroendevalda är invalda postspecifikt och
                sitter i ett år. De sex posterna är: Ordförande, Vice
                ordförande, Ekonomiansvarig, Informationsansvarig,
                Nöjeslivsansvarig och SAMO. Sektionsstyrelsen lyder under
                sektionsmötet som sammanträder minst fyra gånger per år.
                Sektionsföreningar och -utskott ligger under sektionen och är
                till för gemene teknolog. De kan antingen finnas för att främja
                ett specifikt intresse, exempelvis idrott eller en sittning,
                eller för att utföra ett uppdrag, till exempel anordna
                mottagning eller trycka en tidning.
              </p>
            </div>
            <div className="m-auto hidden md:block">
              <Image
                alt="Sektionens uppbyggnad"
                height={250}
                src="/sektionens_uppbyggnad.png"
                width={300}
              />
              <p className="mt-4 text-center">Sektionens uppbyggnad</p>
            </div>
          </div>

          <div className="grid grid-cols-3 py-8">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <h2 className="mb-4 text-2xl font-semibold">
                Våra sektionsorgan
              </h2>
              <p>
                På höstterminen 1986 startades civilingenjörsprogrammet
                Automatiseringsteknik upp av Bengt-Erik Bengtsson (BEB), IVF och
                ett antal industriföretag för att utbilda tekniker med en bred
                bas inom elektroteknik, datateknik och maskinteknik. Då
                bokstaven ”A” redan var upptagen av arkitektprogrammet valdes
                bokstaven ”Z” till att representera programmet (en kort tid
                under första året användes även ”R” - för robot, men det
                övergavs snabbt). Utbildningen hade från början 30 platser som
                utökades till 60 platser 1993 och vidare till 90 platser 1998.
                2001 bytte utbildningsprogrammet namn till Automation och
                Mekatronik. Sektionens maskot är Lucky Luke och sektionsfärgen
                är alla nyanser av grå.
              </p>
            </div>
            <div className="m-auto hidden md:block">
              <Image alt="image" height={250} src="/logo.png" width={250} />
              <p className="mt-4 text-center font-bold">
                Z-teknologsektionens logga
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default AboutPage;
