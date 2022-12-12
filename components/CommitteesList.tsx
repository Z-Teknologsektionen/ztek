import { Committee, ZtekCard } from '../interfaces';
import CommitteeCard from './ZtekCard';
import committeesStyles from '../styles/Committees.module.css'
import getAllCommittees from '../utils/swrFunctions'
import Link from 'next/link';




const CommitteesList = (props: any) => {
  const req: any = getAllCommittees()

  const committees = req.committees?.filter((c: Committee) => c.type === "committee")
  const utskott = req.committees?.filter((c: Committee) => c.type === "utskott")
  if (req.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className={committeesStyles.title}>Kommittéer</h1>
      <hr></hr>
      <div className={committeesStyles.grid}>
        {committees?.map((c: Committee) => (
          <Link href={`/committees/${c.route}`}>
            <CommitteeCard key={c.name} card={{
              title: c.name,
              description: c.description,
              imageUrl: c.imageUrl,
              email: c.email
            }} />
          </Link>
        ))}
      </div>
      <h1 className={committeesStyles.title}>Utskott</h1>
      <hr></hr>
      <div className={committeesStyles.grid}>
        {utskott?.map((c: Committee) => (
          <Link href={`/committees/${c.route}`}>
            <CommitteeCard key={c.name} card={{
              title: c.name,
              description: c.description,
              imageUrl: c.imageUrl,
              email: c.email
            }} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CommitteesList;