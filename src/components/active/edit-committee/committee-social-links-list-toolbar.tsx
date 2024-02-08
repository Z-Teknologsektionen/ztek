import { useState, type FC } from "react";
import type { UseFieldArrayAppend } from "react-hook-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import type { UpsertCommitteeSocialLinksSchemaType } from "./committee-social-links-list";
import { UpsertCommitteeSocailIconsForm } from "./upsert-committee-social-link-form";

type CommitteeSocialLinksToolbarProps = {
  appendSocialLink: UseFieldArrayAppend<
    UpsertCommitteeSocialLinksSchemaType,
    "socialLinks"
  >;
  canCreateNewLink: boolean;
};

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
