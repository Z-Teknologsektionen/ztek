import type { FC } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from "react-icons/fa6";
import { BasicInput } from "~/components/forms/BasicInput";
import SelectCommitteeSocialIcon from "~/components/forms/select-committee-social-icon";
import { Button } from "~/components/ui/button";
import { FormDescription } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { MAX_ORDER_NUMBER } from "~/constants/committees";
import type { UpsertCommitteeFormValues } from "./upsert-committee-form";

type UpsertCommitteeSocialLinksFormSectionProps = {
  control: Control<UpsertCommitteeFormValues>;
};

const UpsertCommitteeSocialLinksFormSection: FC<
  UpsertCommitteeSocialLinksFormSectionProps
> = ({ control }) => {
  const {
    fields: socialLinks,
    append: addSocialIcon,
    swap: swapSocialLinks,
    remove: removeSocialIcon,
  } = useFieldArray({
    name: "socialLinks",
    control,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <Label>Sociala länkar (valfri)</Label>
        <Button
          onClick={() =>
            addSocialIcon({
              iconAndUrl: {
                iconVariant: "QUESTIONMARK",
                url: "",
              },
              order: MAX_ORDER_NUMBER,
            })
          }
          size="icon"
          type="button"
          variant="outline"
        >
          <FaPlus />
          <p className="sr-only">Lägg till ny social länk</p>
        </Button>
      </div>
      {socialLinks.length === 0 ? (
        <FormDescription className="text-xs">
          Inga sociala länkar. Lägg till första genom att klicka på +
        </FormDescription>
      ) : (
        <div className="flex flex-col gap-2">
          {socialLinks.map(({ iconAndUrl: { iconVariant, url }, id }, idx) => {
            return (
              <div
                key={id}
                className="space-y-4 rounded border px-2 py-4 shadow"
              >
                <SelectCommitteeSocialIcon
                  control={control}
                  defaultValue={iconVariant}
                  label="Ikon"
                  name={`socialLinks.${idx}.iconAndUrl.iconVariant`}
                />
                <BasicInput
                  control={control}
                  defaultValue={url}
                  label="Url"
                  name={`socialLinks.${idx}.iconAndUrl.url`}
                />
                <div className="flex flex-row justify-end gap-2">
                  <Button
                    disabled={idx === 0}
                    onClick={() => swapSocialLinks(idx, idx - 1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <FaArrowUp />
                    <p className="sr-only">Flytta uppåt</p>
                  </Button>
                  <Button
                    disabled={idx === socialLinks.length - 1}
                    onClick={() => swapSocialLinks(idx, idx + 1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <FaArrowDown />
                    <p className="sr-only">Flytta nedåt</p>
                  </Button>
                  <Button
                    onClick={() => removeSocialIcon(idx)}
                    size="icon"
                    type="button"
                    variant="destructive"
                  >
                    <FaTrash />
                    <p className="sr-only">Radera länk</p>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpsertCommitteeSocialLinksFormSection;
