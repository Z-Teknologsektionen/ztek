import type { FC } from "react";
import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaPen, FaTrash } from "react-icons/fa6";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  getSocialIconFromEnum,
  getSocialNameFromEnum,
} from "~/utils/getSocialFromEnum";
import type { CommitteeSocialLinksListItemProps } from "./types";
import { UpsertCommitteeSocailIconsForm } from "./upsert-committee-social-icon-form";

const CommitteeSocialLinksListItem: FC<CommitteeSocialLinksListItemProps> = ({
  socialLink,
  index,
  isFirstItem,
  isLastItem,
  removeSocialLink,
  updateSocialLink,
  swapSocialLinks,
}) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const Icon = getSocialIconFromEnum(socialLink.iconAndUrl.iconVariant);
  const iconName = getSocialNameFromEnum(socialLink.iconAndUrl.iconVariant);

  return (
    <div className="flex w-full flex-row items-center justify-between rounded border px-4 py-2 shadow">
      <div className="flex flex-row items-center gap-2">
        <Icon className="block h-8 w-8" title={iconName} />
        <p>{socialLink.iconAndUrl.url}</p>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          className="border-slate-300 p-1"
          disabled={isFirstItem}
          onClick={() => {
            swapSocialLinks(index, index - 1);
          }}
          size="sm"
          variant="outline"
        >
          <FaArrowUp className="h-3 w-3" />
        </Button>
        <Button
          className="border-slate-300 p-1"
          disabled={isLastItem}
          onClick={() => {
            swapSocialLinks(index, index + 1);
          }}
          size="sm"
          variant="outline"
        >
          <FaArrowDown className="h-3 w-3" />
        </Button>
        <UpsertDialog
          form={
            <UpsertCommitteeSocailIconsForm
              defaultValues={socialLink}
              formType="update"
              onSubmit={(values) => {
                updateSocialLink(index, values);
                setUpdateModalOpen(false);
              }}
            />
          }
          isOpen={updateModalOpen}
          setIsOpen={setUpdateModalOpen}
          title="Updatera social länk"
          trigger={
            <Button className="">
              <FaPen />
            </Button>
          }
        />
        <Button
          className=""
          onClick={() => {
            removeSocialLink(index);
          }}
          variant="destructive"
        >
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

export default CommitteeSocialLinksListItem;
