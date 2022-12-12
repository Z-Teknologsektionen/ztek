import { ZtekCard } from "../interfaces";
import committeesStyles from '../styles/Committees.module.css'
import Image from 'next/image'


type ZtekCardProps = {
  card: ZtekCard
};


const CommitteeCard = ({ card }: ZtekCardProps) => {
  let imageUrl: string = "/default.png"
  if (card.imageUrl !== "") {
    imageUrl = "/committees/" + card.imageUrl
  }
  return (
    <div className={committeesStyles.card}>
      <div className={committeesStyles.imageContainer}>
        <Image
          className={committeesStyles.image}
          src={imageUrl}
          alt="Profile picture"
          width={372}
          height={372}
        />

      </div>
      <h1>{card.title}</h1>
      <p>{card.description}</p>
      <br></br>
      <div className={committeesStyles.footer}>
        <p className={committeesStyles.p}>Maila oss!</p>
      </div>
    </div>
  );
}

export default CommitteeCard;