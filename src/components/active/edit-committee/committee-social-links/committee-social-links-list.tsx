import { useMemo, type FC } from "react";
import { useFieldArray } from "react-hook-form";
import type { z } from "zod";
import { MAX_NUMER_OF_SOCIAL_LINKS } from "~/constants/committees";
import { useAddCommitteeSocialLinksAsActive } from "~/hooks/mutations/useMutateCommittee";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { upsertCommitteeSocialLinksBaseSchema } from "~/schemas/committee";
import CommitteeSocialLinksListActions from "./committee-social-links-list-actions";
import CommitteeSocialLinksListItem from "./committee-social-links-list-item";
import CommitteeSocialLinksToolbar from "./committee-social-links-list-toolbar";

export type UpsertCommitteeSocialLinksSchemaType = z.infer<
  typeof upsertCommitteeSocialLinksBaseSchema
>;

type CommitteeSocialLinksListProps = {
  committeeId: string;
  initialSocialLinks: UpsertCommitteeSocialLinksSchemaType["socialLinks"];
};

const CommitteeSocialLinksList: FC<CommitteeSocialLinksListProps> = ({
  initialSocialLinks,
  committeeId,
}) => {
  const { mutate: updateSocialLinks } = useAddCommitteeSocialLinksAsActive();

  const form = useFormWithZodSchema({
    schema: upsertCommitteeSocialLinksBaseSchema,
    defaultValues: { socialLinks: initialSocialLinks },
  });

  const {
    fields: socialLinks,
    append: appendSocialLink,
    remove: removeSocialLink,
    swap: swapSocialLinks,
    update: updateSocialLink,
    replace: setSocialLinks,
  } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const hasUpdatedSocialLinks = useMemo(
    () =>
      socialLinks.length !== initialSocialLinks.length ||
      initialSocialLinks
        .map((link, idx) => {
          const { id: _id, ...otherLink } = socialLinks.at(
            idx,
          ) as typeof link & { id: string };
          return JSON.stringify(link) === JSON.stringify(otherLink);
        })
        .includes(false),
    [initialSocialLinks, socialLinks],
  );

  return (
    <>
      <CommitteeSocialLinksToolbar
        appendSocialLink={appendSocialLink}
        canCreateNewLink={socialLinks.length < MAX_NUMER_OF_SOCIAL_LINKS}
      />
      {socialLinks.length === 0 ? (
        <p className="w-full text-center">Lägg till organets första länk</p>
      ) : (
        <div className="flex w-full flex-col gap-2">
          {socialLinks.map((socialLink, idx) => (
            <CommitteeSocialLinksListItem
              key={socialLink.id}
              index={idx}
              isFirstItem={idx === 0}
              isLastItem={idx === socialLinks.length - 1}
              removeSocialLink={removeSocialLink}
              socialLink={socialLink}
              swapSocialLinks={swapSocialLinks}
              updateSocialLink={updateSocialLink}
            />
          ))}
        </div>
      )}
      <CommitteeSocialLinksListActions
        hasUpdatedSocialLinks={hasUpdatedSocialLinks}
        resetSocialLinks={() => setSocialLinks(initialSocialLinks)}
        saveSocialLinks={() =>
          updateSocialLinks({ id: committeeId, socialLinks: socialLinks })
        }
      />
    </>
  );
};

export default CommitteeSocialLinksList;
