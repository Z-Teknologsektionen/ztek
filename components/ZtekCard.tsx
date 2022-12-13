import { ZtekCard } from "../interfaces";
import cardStyles from "../styles/ZtekCard.module.css";
import Image from "next/image";

type ZtekCardProps = {
  card: ZtekCard;
};

const CommitteeCard = ({ card }: ZtekCardProps) => {
  let imageUrl: string = "/default.png";
  if (card.imageUrl !== "") {
    imageUrl = "/committees/" + card.imageUrl;
  }
  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.imageContainer}>
        <Image
          className={cardStyles.image}
          src={imageUrl}
          alt="Profile picture"
          width={372}
          height={372}
        />
      </div>
      <div className={cardStyles.cardBody}>
        <h4>{card.title}</h4>
        <br />
        <p>{card.description}</p>
        <br></br>
      </div>
      <div className={cardStyles.footer}>
        <p className={cardStyles.p}>Maila oss!</p>
      </div>
    </div>
  );
};

export default CommitteeCard;
