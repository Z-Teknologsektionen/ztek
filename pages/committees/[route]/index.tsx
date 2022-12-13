import { GetStaticProps, GetStaticPaths } from 'next'
import sektionsorgan from '../../../utils/sektionsorgan.json'
import { Committee, CommitteeMember } from "../../../interfaces";
import committeesStyles from '../../../styles/Committees.module.css'
import CommitteeCard from '../../../components/ZtekCard';
import Image from 'next/image'

type CommitteeProps = {
    committee: Committee
};


const committee = ({ committee }: CommitteeProps) => {

    const imageUrl = committee.imageUrl !== "" ? "/committees/" + committee.imageUrl : "/default.png"
    return (
        <div className={committeesStyles.container}>
            <div className={committeesStyles.imageContainer}>
                <Image
                    src={imageUrl}
                    alt={"Committee logo"}
                    width={400}
                    height={400}
                />
            </div>
            <h2>{committee.name}</h2>
            <hr></hr>
            <p>{committee.longDescription}</p>
            <div className={committeesStyles.grid}>
                {committee?.members.map((c: CommitteeMember) => (
                    <CommitteeCard key={c.name} card={{
                        title: c.name,
                        description: c.role,
                        imageUrl: c.imageUrl,
                        email: c.email
                    }} />
                ))}
            </div>
            {/* This is a committee page with route {route} */}
        </div>
    );
}
export default committee;


export const getStaticProps: GetStaticProps = async (context) => {
    const committee = sektionsorgan.find(c => c.route === context.params?.route) as Committee
    return {
        props: {
            committee,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const routes = sektionsorgan.map((c) => c.route)
    const paths = routes.map((route) => ({ params: { route: route.toString() } }))

    return {
        paths,
        fallback: false,
    }
}