import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import Unauthorized from "~/components/layout/Unauthorized";

const AdminHomePage: NextPage = () => {
  const { data: session } = useSession({ required: true });

  if (!session?.user.admin) {
    return <Unauthorized />;
  }

  return (
    <main>
      <SectionWrapper>
        <SectionTitle>Admin Panel</SectionTitle>
        <div></div>
      </SectionWrapper>
    </main>
  );
};

export default AdminHomePage;
