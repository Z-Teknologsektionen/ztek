import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import CommitteeTable from "~/components/data-table/committees/committee-table";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import RoleWrapper from "../layout/RoleWrapper";

const AdminCommitteePage: FC = () => {
  return (
    <RoleWrapper accountRole={AccountRoles.ADMIN}>
      <SectionWrapper>
        <SectionTitle center>Sektionsorgan</SectionTitle>
        <CommitteeTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdminCommitteePage;
