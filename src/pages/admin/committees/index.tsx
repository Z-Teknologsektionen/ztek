import { type NextPage } from "next";
import { useRouter } from "next/router";
import { CreateNewOrganWizard } from "~/components/admin/committees/CreateNewOrganWizard";
import { DeleteOraganWizard } from "~/components/admin/committees/DeleteOraganWizard";
import { UpdateOrganWizard } from "~/components/admin/committees/UpdateOrganWizard";
import OrganTable from "~/components/data-table/committees/committee-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { useRouterHelpers } from "~/utils/router";

const AdminOrganPage: NextPage = () => {
  const router = useRouter();
  const { clearQuery } = useRouterHelpers();
  const { newCommittee, editCommittee, delCommittee } = router.query;

  return (
    <AdminWrapper>
      <SectionWrapper>
        <OrganTable />
      </SectionWrapper>
      <CreateNewOrganWizard
        isOpen={Boolean(newCommittee)}
        onClose={() => void clearQuery()}
      />
      {typeof editCommittee === "string" && (
        <UpdateOrganWizard
          isOpen={Boolean(editCommittee)}
          onClose={() => void clearQuery()}
          slug={editCommittee}
        />
      )}
      {typeof delCommittee === "string" && (
        <DeleteOraganWizard
          id={delCommittee}
          isOpen={Boolean(delCommittee)}
          onClose={() => void clearQuery()}
        />
      )}
    </AdminWrapper>
  );
};

export default AdminOrganPage;
