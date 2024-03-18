import { Reorder } from "framer-motion";
import { useState, type FC } from "react";
import type {
  FieldArrayWithId,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import UpsertCommitteeSocialLinksReorderItem from "./upsert-committee-social-links-reorder-item";
import type { SocialLinksObject } from "./upsert-committee-social-links-section";

const UpsertCommitteeSocialLinksReorderGroup: FC<{
  form: UseFormReturn<SocialLinksObject>;
  moveSocialLinks: UseFieldArrayMove;
  removeSocialIcon: UseFieldArrayRemove;
  socialLinks: FieldArrayWithId<SocialLinksObject, "socialLinks", "id">[];
}> = ({ form, moveSocialLinks, removeSocialIcon, socialLinks }) => {
  const [reorderActiveIdx, setReorderActiveIdx] = useState(0);

  return (
    <Reorder.Group
      as="ul"
      className="flex flex-col gap-2"
      onReorder={(e) => {
        const activeSocialLink = socialLinks[reorderActiveIdx];
        e.map((socialLink, idx) => {
          if (socialLink !== activeSocialLink) return;
          moveSocialLinks(idx, reorderActiveIdx);
          setReorderActiveIdx(idx);
        });
      }}
      values={socialLinks}
    >
      {socialLinks.map((socialLink, idx) => (
        <UpsertCommitteeSocialLinksReorderItem
          key={socialLink.id}
          form={form}
          idx={idx}
          onDragStart={() => setReorderActiveIdx(idx)}
          removeSocialIcon={removeSocialIcon}
          socialLink={socialLink}
        />
      ))}
    </Reorder.Group>
  );
};

export default UpsertCommitteeSocialLinksReorderGroup;
