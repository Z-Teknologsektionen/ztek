import { useState, type FC } from "react";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import type { CommitteeSocialLinksToolbarProps } from "./types";
import { UpsertCommitteeSocailIconsForm } from "./upsert-committee-social-icon-form";

const CommitteeSocialLinksToolbar: FC<CommitteeSocialLinksToolbarProps> = ({
  canCreateNewLink,
  appendSocialLink,
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-row justify-end">
      <UpsertDialog
        form={
          <UpsertCommitteeSocailIconsForm
            key={"new"}
            formType="create"
            onSubmit={(values) => {
              appendSocialLink(values);
              setCreateModalOpen(false);
            }}
          />
        }
        isOpen={createModalOpen}
        setIsOpen={setCreateModalOpen}
        title="Ny social länk"
        trigger={
          <Button
            className="ml-2 h-8 px-2 lg:px-3"
            disabled={!canCreateNewLink}
            size="lg"
            type="button"
            variant="outline"
          >
            Ny länk
          </Button>
        }
      />
    </div>
  );
};

export default CommitteeSocialLinksToolbar;
