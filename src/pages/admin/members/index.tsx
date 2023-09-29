import type { NextPage } from "next";
import { useRouter } from "next/router";
import { CreateNewMemberWizard } from "~/components/admin/medlemmar/CreateNewMemberWizard";
import { DeleteMemberWizard } from "~/components/admin/medlemmar/DeleteMemberWizard";
import { UpdateMemberWizard } from "~/components/admin/medlemmar/UpdateMemberWizard";
import MemberTable from "~/components/data-table/members/member-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { useRouterHelpers } from "~/utils/router";

const AdminMemberPage: NextPage = () => {
  const router = useRouter();
  const { clearQuery } = useRouterHelpers();

  const { delMember, editMember, newMember } = router.query;

  return (
    <AdminWrapper>
      <SectionWrapper>
        <MemberTable />
      </SectionWrapper>
      <CreateNewMemberWizard
        close={() => void clearQuery()}
        isOpen={Boolean(newMember)}
      />
      {typeof editMember === "string" && (
        <UpdateMemberWizard
          close={() => void clearQuery()}
          id={editMember}
          isOpen={Boolean(editMember)}
        />
      )}
      {typeof delMember === "string" && (
        <DeleteMemberWizard
          close={() => void clearQuery()}
          id={delMember}
          isOpen={Boolean(delMember)}
        />
      )}
    </AdminWrapper>
  );
};

export default AdminMemberPage;
