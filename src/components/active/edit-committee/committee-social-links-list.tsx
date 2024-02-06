import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, type FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { MAX_NUMER_OF_SOCIAL_LINKS } from "~/constants/committees";
import { useAddCommitteeSocialLinksAsUser } from "~/hooks/useSetCommitteeSocialLinksAsUser";
import { upsertCommitteeSocialLinksBaseSchema } from "~/server/api/helpers/schemas/committees";
import CommitteeSocialLinksListItem from "./committee-social-links-list-item";
import CommitteeSocialLinksToolbar from "./committee-social-links-list-toolbar";
import type {
  CommitteeSocialLinksListProps,
  UpsertCommitteeSocialLinksSchemaType,
} from "./types";

const CommitteeSocialLinksList: FC<CommitteeSocialLinksListProps> = ({
  initialSocialLinks,
  committeeId,
}) => {
  const { mutate: updateSocialLinks } = useAddCommitteeSocialLinksAsUser();

  const form = useForm<UpsertCommitteeSocialLinksSchemaType>({
    resolver: zodResolver(upsertCommitteeSocialLinksBaseSchema),
    defaultValues: {
      socialLinks: initialSocialLinks,
    },
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

  const hasUpdated = useMemo(
    () =>
      socialLinks.length !== initialSocialLinks.length ||
      initialSocialLinks
        .map((link, idx) => {
          const otherLink = socialLinks.at(idx);
          if (otherLink === undefined) return false;
          return (
            link.iconAndUrl.iconVariant === otherLink.iconAndUrl.iconVariant &&
            link.order === otherLink.order &&
            link.iconAndUrl.url === otherLink.iconAndUrl.url
          );
        })
        .includes(false),
    [initialSocialLinks, socialLinks],
  );

  return (
    <>
      <CommitteeSocialLinksToolbar
        key={socialLinks.length}
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
      <div className="flex flex-row justify-end gap-2">
        <Button
          onClick={() => setSocialLinks(initialSocialLinks)}
          variant="outline"
        >
          Återställ
        </Button>
        <Button
          className={`${hasUpdated && "animate-pulse duration-1000"}`}
          onClick={() =>
            updateSocialLinks({ id: committeeId, socialLinks: socialLinks })
          }
        >
          Spara
        </Button>
      </div>
    </>
  );
};

export default CommitteeSocialLinksList;
