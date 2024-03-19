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
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <FormLabel>Sociala länkar (valfri)</FormLabel>
        <Button
          className="mx-2 h-7"
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
      <FormField
        control={form.control}
        name={"socialLinks.root" as "socialLinks"} // För att få rätt error meddelanden från zod
        render={() => (
          <FormItem>
            <FormDescription className="text-xs font-normal">
              Här kan du hantera organets länkar. Ordningen kan ändras genom att
              dra i pilen. En länk till organets mail kommer finns och behöver
              därför inte skapas. Den kommer alltid vissas först.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {socialLinks.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          Inga sociala länkar inlagda.
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
