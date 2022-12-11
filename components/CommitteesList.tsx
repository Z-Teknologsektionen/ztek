import { Committee } from '../interfaces';
import CommitteeCard from './CommitteeCard';
import committeesStyles from '../styles/Committes.module.css'
import getAllCommittees from '../utils/swrFunctions'

const CommitteesList = (props: any) => {
    const req: any = getAllCommittees()

    if (req.isLoading) {
        return <div>Loading...</div>
    }


    return (
        <div>
            {req.committees?.map((c: Committee) => (
                <CommitteeCard key={c.name} committee={c}/>
            ))}
        </div>
    );
}

export default CommitteesList;