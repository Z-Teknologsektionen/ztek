import Link from "next/link";
import { Committee, CommitteeMember } from "../interfaces";
import aboutStyles from "../styles/About.module.css";
import getAllCommittees from "../utils/swrFunctions";

const About = () => {
  const req: any = getAllCommittees();
  const ztyret: Committee = req.committees?.find(
    (c: Committee) => c.route === "ztyret"
  );
  const committes: Array<Committee> = req.committees?.filter(
    (c: Committee) => c.type === "committee"
  );
  const utskott: Array<Committee> = req.committees?.filter(
    (c: Committee) => c.type === "utskott"
  );
  const unspecified: Array<Committee> = req.committees?.filter(
    (c: Committee) => c.type !== "utskott" && c.type !== "committee"
  );
  return (
    <div className={`${aboutStyles.container} ${aboutStyles.grid}`}>
      <div className={aboutStyles.row}>
        <div
          className={`${aboutStyles.column} ${aboutStyles.left} ${aboutStyles.sektionen}`}
        >
          <h2 className={aboutStyles.topTitle}>Sektionen</h2>
          <div className={aboutStyles.section}>
            <div className={aboutStyles.text}>
              Z-teknologsektionen, är en studerandesektion tillhörande Chalmers
              Studentkår vid Chalmers tekniska högskola i Göteborg.
              Teknologsektionen är till för de som studerar
              civilingenjörsprogrammet i Automation och Mekatronik på Chalmers.
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>SEKTIONSSTYRELSEN</h5>
            <div className={aboutStyles.text}>
              Sektionen leds av Sektionsstyrelsen, <Link href={`/committees/${ztyret?.route}`}>{ztyret?.name}</Link>, som består av{" "}
              {ztyret?.members?.length} förtroendevalda. De förtroendevalda är
              invalda postspecifikt och sitter i ett år. De{" "}
              {ztyret?.members?.length} posterna är:
              <ul>
                {ztyret?.members?.map((m: CommitteeMember) => {
                  return <li key={`about-${m.name}`}>{m.role}</li>;
                })}
              </ul>
              Sektionsstyrelsen lyder under sektionsmötet som sammanträder minst
              fyra gånger per år.
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>SEKTIONSMÖTET</h5>
            <div className={aboutStyles.text}>
              Sektionsmötet är sektionens högst beslutande organ och beslutar om
              stadgar, reglementen, inval till förtroendeposter samt mycket
              annat.
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>SEKTIONSFÖRENINGAR, -KOMMITTÉER OCH -UTSKOTT</h5>
            <div className={aboutStyles.text}>
              Sektionsföreningar och -utskott ligger under sektionen och är till
              för gemene teknolog. De kan antingen finnas för att främja ett
              specifikt intresse, exempelvis idrott eller en sittning, eller för
              att utföra ett uppdrag, till exempel anordna mottagning eller
              trycka en tidning.
              <br />
              <br />
              Sektionens kommittéer är:
              <ul>
                {committes?.map((c: Committee) => {
                  return (
                    <li key={`about-${c.name}`}>
                      <Link href={`/committees/${c.route}`}>
                        <strong className={aboutStyles.hoverLink}>{c.name}:</strong>
                      </Link>
                      {` ${c.description}`}
                    </li>
                  );
                })}
              </ul>
              Sektionens utskott är:
              <ul>
                {utskott?.map((c: Committee) => {
                  return (
                    <li key={`about-${c.name}`}>
                      <Link href={`/committees/${c.route}`}>
                        <strong className={aboutStyles.hoverLink}>{c.name}:</strong>
                      </Link>
                      {` ${c.description}`}
                    </li>
                  );
                })}
              </ul>
              Sektionens övriga organ och föreningar:
              <ul>
                {unspecified?.map((c: Committee) => {
                  return (
                    <li key={`about-${c.name}`}>
                      <Link href={`/committees/${c.route}`}>
                        <strong className={aboutStyles.hoverLink}>{c.name}:</strong>
                      </Link>
                      {` ${c.description}`}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>INSPEKTOR</h5>
            <div className={aboutStyles.text}>
              Inspektorn skall ägna uppmärksamhet åt och stödja sektionens
              verksamhet. Inspektor skall även kunna verka som besvärsnämnd och
              stadgetolkning om nöden så kräver. Sektionens nuvarande inspektor
              heter Malin Karlsson.
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>HEDERSMEDLEMMAR</h5>
            <div className={aboutStyles.text}>
              En hedersmedlem i z-teknologsektionen är personer som synnerligen
              främjat sektionens intressen och strävanden, eller på annat sätt
              tillförskansat sig medlemmarnas vördnad och respekt. I dagsläget
              har sektionen 5 hedersmedlemmar:
              <br />
              <br />
              <strong>Bengt Eric Bengtsson (BEB)</strong> - Grundare av Z
              <br />
              <strong>Bengt Lennartsson (BeLe)</strong> - Föredetta
              Programansvarig
              <br />
              <strong>Jonas Sjöberg</strong> - Föredetta Programansvarig
              <br />
              <strong>Andreas Eklöf</strong> - Z-anda och toastmaster
              <br />
              <strong>Peter Olsson</strong> - Enastående lärare och skaparen av
              Kapten Obsolet
            </div>
          </div>
        </div>
        <div
          className={`${aboutStyles.column} ${aboutStyles.right} ${aboutStyles.sektionen}`}
        >
          <h2 className={aboutStyles.topTitle}>Programmet</h2>
          <div className={aboutStyles.section}>
            <div className={aboutStyles.text}>
              Automation och Mekatronik är en civilingenjörsutbildning med ett
              helhetsgrepp kring kompetenser som behövs för att utveckla
              produkter som är billigare, bättre och mer energisnåla och
              miljövänliga än dagens. Utbildningen kan kort beskrivas som
              belägen i gränslandet mellan maskin-, elektro- och datateknik.
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>BÖRJA PÅ AUTOMATION OCH MEKATRONIK?</h5>
            <div className={aboutStyles.text}>
              Funderar du på att börja på Automation och Mekatronik på Chalmers?
              Klicka dig vidare här för att få reda på mer:{" "}
              <Link href={"https://www.pluggaz.se"} target="_blank" className={aboutStyles.link}>
                www.pluggaz.se
              </Link>
            </div>
          </div>
          <div className={aboutStyles.section}>
            <h5>KONTAKTA PROGRAMMET</h5>
            <div className={aboutStyles.text}>
              <strong>Knut Åkesson</strong> - Programansvarig
              <br />
              E-post:{" "}
              <a className={aboutStyles.link} href="mailto:knut@chalmers.se">
                knut@chalmers.se
              </a>
              <br />
              Telefon: <a href="tel:+46 31 772 37 17">+46 31 772 37 17</a>
              <br />
              <br />
              <strong>Anders Ankén</strong> - Studievägledare
              <br />
              E-post:{" "}
              <a className={aboutStyles.link} href="mailto:anken@chalmers.se">
                anken@chalmers.se
              </a>
              <br />
              Telefon: <a href="tel:031-772 6722">031-772 6722</a>
              <br />
              <br />
              <strong>Björn Friberg</strong> - Utbildningssekreterare
              <br />
              E-post:{" "}
              <a
                className={aboutStyles.link}
                href="mailto:bjorn.friberg@chalmers.se"
              >
                bjorn.friberg@chalmers.se
              </a>
              <br />
              Telefon: <a href="tel:031 772 20 88">031 772 20 88</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
