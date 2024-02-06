import type {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFieldArrayUpdate,
} from "react-hook-form";
import type { z } from "zod";
import type {
  socialIconSchema,
  upsertCommitteeSocialLinksBaseSchema,
} from "~/server/api/helpers/schemas/committees";
import type { RouterOutputs } from "~/utils/api";

export type MemberType =
  RouterOutputs["committee"]["getOneByEmail"]["members"][0];

export type CommitteeSocialLinks =
  RouterOutputs["committee"]["getOneByEmail"]["socialLinks"];

export type CommitteeSocialLinksAsZod = z.infer<typeof socialIconSchema>;

export type UpsertCommitteeSocialLinksSchemaType = z.infer<
  typeof upsertCommitteeSocialLinksBaseSchema
>;

export type CommitteeSocialLinksListItemProps = {
  index: number;
  isFirstItem: boolean;
  isLastItem: boolean;
  removeSocialLink: UseFieldArrayRemove;
  socialLink: CommitteeSocialLinksAsZod;
  swapSocialLinks: UseFieldArraySwap;
  updateSocialLink: UseFieldArrayUpdate<
    UpsertCommitteeSocialLinksSchemaType,
    "socialIcons"
  >;
};

export type CommitteeSocialLinksToolbarProps = {
  appendSocialLink: UseFieldArrayAppend<
    UpsertCommitteeSocialLinksSchemaType,
    "socialIcons"
  >;
  canCreateNewLink: boolean;
};

export type CommitteeSocialLinksListProps = {
  committeeId: string;
  initialSocialLinks: UpsertCommitteeSocialLinksSchemaType["socialIcons"];
};

export type UpdateCommitteeWizardProps = {
  committee: RouterOutputs["committee"]["getOneByEmail"];
  refetchCommittee: () => void;
};

export type UpdateUserWizardProps = {
  member: MemberType;
  refetch: () => void;
};
