import CommitteeList from "../components/CommitteesList";
import committeesStyles from '../styles/Committees.module.css'
const committees = () => {
    return (
        <div className={committeesStyles.grid}>
            <CommitteeList />
        </div>
    );
}

export default committees;