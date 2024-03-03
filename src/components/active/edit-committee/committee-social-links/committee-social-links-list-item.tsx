import type { FC } from "react";
import { useState } from "react";
import type {
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFieldArrayUpdate,
} from "react-hook-form";
import { FaArrowDown, FaArrowUp, FaPen, FaTrash } from "react-icons/fa6";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import ButtonWithIconAndTooltip from "~/components/tooltips/button-with-icon-and-tooltip";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import TruncatedStringWithTooltip from "~/components/tooltips/truncated-string-with-tooltip";
import {
  getSocialIconFromEnum,
  getSocialNameFromEnum,
} from "~/utils/get-social-from-enum";
import type { UpsertCommitteeSocialLinksSchemaType } from "./committee-social-links-list";
import { UpsertCommitteeSocailIconsForm } from "./upsert-committee-social-link-form";

type CommitteeSocialLinksListItemProps = {
  index: number;
  isFirstItem: boolean;
  isLastItem: boolean;
  removeSocialLink: UseFieldArrayRemove;
  socialLink: UpsertCommitteeSocialLinksSchemaType["socialLinks"][0];
  swapSocialLinks: UseFieldArraySwap;
  updateSocialLink: UseFieldArrayUpdate<
    UpsertCommitteeSocialLinksSchemaType,
    "socialLinks"
  >;
};

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
    <div className="flex flex-row items-center justify-between rounded border px-4 py-1 shadow">
      <div className="flex w-full flex-row items-center gap-2 overflow-hidden">
        <IconWithTooltip icon={Icon} size={25} tooltipText={iconName} />
        <TruncatedStringWithTooltip
          className="text-sm"
          text={socialLink.iconAndUrl.url}
        />
      </div>
      <div className="flex flex-none flex-row gap-2">
        <ButtonWithIconAndTooltip
          disabled={isFirstItem}
          icon={FaArrowUp}
          onClick={() => {
            swapSocialLinks(index, index - 1);
          }}
          tooltipText="Flytta social länk uppåt"
        />
        <ButtonWithIconAndTooltip
          disabled={isLastItem}
          icon={FaArrowDown}
          onClick={() => {
            swapSocialLinks(index, index + 1);
          }}
          tooltipText="Flytta social länk nedåt"
        />
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
            <>
              <ButtonWithIconAndTooltip
                className="fill-waring"
                icon={FaPen}
                tooltipText="Updatera social länk"
              />
            </>
          }
        />

        <ButtonWithIconAndTooltip
          className="fill-danger"
          icon={FaTrash}
          onClick={() => {
            removeSocialLink(index);
          }}
          tooltipText="Radera social länk"
        />
      </div>
    </div>
  );
};

export default CommitteeSocialLinksListItem;
