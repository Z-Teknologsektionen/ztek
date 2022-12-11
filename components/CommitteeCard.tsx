import { Committee } from "../interfaces";
import committeesStyles from '../styles/Committees.module.css'
type CommitteeCardProps = {
    committee: Committee
};


const CommitteeCard = ({committee}: CommitteeCardProps) => {
    return (
        <div className={committeesStyles.card}>
            <img src={"committees/" + committee.imageUrl}></img>
            <h1>{committee.name}</h1>
            <p>{committee.description}</p>
            <br></br>
            <div className={committeesStyles.footer}>
                <p className={committeesStyles.p}>Maila oss!</p>
            </div>
        </div>
    );
}

export default CommitteeCard;