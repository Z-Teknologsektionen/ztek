import { type NextPage } from "next";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const AdminHomePage: NextPage = () => {
  return (
    <AdminWrapper>
      <SectionWrapper>
        <SectionTitle>Admin Panel</SectionTitle>
        <div></div>
      </SectionWrapper>
    </AdminWrapper>
  );
};

export default AdminHomePage;
