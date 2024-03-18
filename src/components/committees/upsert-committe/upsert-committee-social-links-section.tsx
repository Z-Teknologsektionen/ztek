import { type FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { upsertCommitteeBaseSchema } from "~/schemas/committee";
import UpsertCommitteeSocialLinksReorderGroup from "./upsert-committee-social-links-reorder-group";

export type SocialLinksObject = Pick<
  z.infer<typeof upsertCommitteeBaseSchema>,
  "socialLinks"
>;

const UpsertCommitteeSocialLinksSection: FC = () => {
  const form = useFormContext<SocialLinksObject>();

  const {
    fields: socialLinks,
    append: addSocialIcon,
    move: moveSocialLinks,
    remove: removeSocialIcon,
  } = useFieldArray({
    name: "socialLinks",
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-start justify-between gap-4">
        <FormField
          control={form.control}
          name={"socialLinks.root" as "socialLinks"} // För att få rätt error meddelanden från zod
          render={() => (
            <FormItem>
              <FormLabel>Sociala länkar (valfri)</FormLabel>
              <FormDescription className="text-xs">
                Här kan du hantera organets länkar. Ordningen kan ändras genom
                att dra i pilen. Det måste finnas en maillänk till organet
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mx-2"
          onClick={() =>
            addSocialIcon({
              iconVariant: "" as "QUESTIONMARK",
              url: "",
              linkText: "",
            })
          }
          size="sm"
          type="button"
          variant="outline"
        >
          Ny social länk
        </Button>
      </div>
      {socialLinks.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Inga sociala länkar.
        </p>
      ) : (
        <UpsertCommitteeSocialLinksReorderGroup
          form={form}
          moveSocialLinks={moveSocialLinks}
          removeSocialIcon={removeSocialIcon}
          socialLinks={socialLinks}
        />
      )}
    </div>
  );
};

export default UpsertCommitteeSocialLinksSection;
