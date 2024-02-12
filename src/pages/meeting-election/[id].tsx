import { type NextPage } from "next";
import { useRouter } from "next/router";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const MeetingElectionPage: NextPage = () => {
  const router = useRouter();
  const {
    data: meetingElection,
    isLoading,
    isError,
  } = api.meetingElection.getOneById.useQuery({
    id: router.query.id as string,
  });
  return (
    <SectionWrapper>
      <SectionTitle center>{meetingElection?.title}</SectionTitle>
      {isLoading && <p>laddar...</p>}
      {isError && <p>de e fel...</p>}
    </SectionWrapper>
  );
};

export default MeetingElectionPage;
