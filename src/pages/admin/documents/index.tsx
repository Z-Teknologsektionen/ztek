import type { NextPage } from "next";
import { useRouter } from "next/router";
import { CreateNewDocumentGroupWizard } from "~/components/admin/document/CreateNewDocumentGroupWizard";
import { CreateNewDocumentWizard } from "~/components/admin/document/CreateNewDocumentWizard";
import { DeleteDocumentGroupWizard } from "~/components/admin/document/DeleteDocumentGroupWizard";
import { DeleteDocumentWizard } from "~/components/admin/document/DeleteDocumentWizard";
import { UpdateDocumentGroupWizard } from "~/components/admin/document/UpdateDocumentGroupWizard";
import { UpdateDocumentWizard } from "~/components/admin/document/UpdateDocumentWizard";
import DocuemntGroupTable from "~/components/data-table/document-group/document-group-table";
import DocuemntTable from "~/components/data-table/document/document-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { useRouterHelpers } from "~/utils/router";

const AdminDocumentPage: NextPage = () => {
  const router = useRouter();
  const { clearQuery } = useRouterHelpers();

  const { newDoc, newGroup, editDoc, delDoc, editGroup, delGroup } =
    router.query;

  return (
    <AdminWrapper requiredRole="MODIFY_DOCUMENTS">
      <SectionWrapper>
        <DocuemntTable />
      </SectionWrapper>
      <SectionWrapper>
        <DocuemntGroupTable />
      </SectionWrapper>

      <CreateNewDocumentWizard
        isOpen={Boolean(newDoc)}
        onClose={() => void clearQuery()}
      />
      {typeof editDoc === "string" && (
        <UpdateDocumentWizard
          id={editDoc}
          isOpen={Boolean(editDoc)}
          onClose={() => void clearQuery()}
        />
      )}
      {typeof delDoc === "string" && (
        <DeleteDocumentWizard
          id={delDoc}
          isOpen={Boolean(delDoc)}
          onClose={() => void clearQuery()}
        />
      )}
      <CreateNewDocumentGroupWizard
        isOpen={Boolean(newGroup)}
        onClose={() => void clearQuery()}
      />
      {typeof editGroup === "string" && (
        <UpdateDocumentGroupWizard
          id={editGroup}
          isOpen={Boolean(editGroup)}
          onClose={() => void clearQuery()}
        />
      )}
      {typeof delGroup === "string" && (
        <DeleteDocumentGroupWizard
          id={delGroup}
          isOpen={Boolean(delGroup)}
          onClose={() => void clearQuery()}
        />
      )}
    </AdminWrapper>
  );
};

export default AdminDocumentPage;
