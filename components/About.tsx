import { Committee } from "../interfaces";
import aboutStyles from "../styles/About.module.css";
import getAllCommittees from "../utils/swrFunctions";

const About = () => {

    const req: any = getAllCommittees()
    const ztyret: Committee = req.committees?.filter((c: Committee) => c.route === "ztyret")[0]

    console.log(ztyret)
  return (
    <div className={`${aboutStyles.container} ${aboutStyles.grid}`}>
      <div className={aboutStyles.row}>
        <div
          className={`${aboutStyles.column} ${aboutStyles.left} ${aboutStyles.sektionen}`}
        >
          <h3>Sektionen</h3>
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
              Sektionen leds av Sektionsstyrelsen, Ztyret, som består av {ztyret?.members?.length} förtroendevalda. De förtroendevalda är invalda postspecifikt och
              sitter i ett år. De {ztyret?.members?.length} posterna är:
              <ul>
                <li>Ordförande</li>
                <li>Vice ordförande</li>
                <li>Ekonomiansvarig</li>
                <li>Informationsansvarig</li>
                <li>Nöjeslivsansvarig</li>
                <li>SAMO (StuderandeArbetsMiljöOmbud)</li>
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
              <ul>
                <li><strong>ZØK:</strong> Arrangerar Z-sektionens mottagning</li>
                <li>Vice ordförande</li>
                <li>Ekonomiansvarig</li>
                <li>Informationsansvarig</li>
                <li>Nöjeslivsansvarig</li>
                <li>SAMO (StuderandeArbetsMiljöOmbud)</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${aboutStyles.column} ${aboutStyles.right} ${aboutStyles.sektionen}`}
        >
          <h3>Programmet</h3>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default About;
