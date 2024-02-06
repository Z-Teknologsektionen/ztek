import type { FC } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from "react-icons/fa6";
import { BasicInput } from "~/components/forms/BasicInput";
import { Button } from "~/components/ui/button";
import { FormDescription } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import UpsertCommitteeSocialIconSelect from "../edit-committee/upsert-committee-social-icon-select";
import type { UpsertCommitteeFormValues } from "./upsert-committee-form";

type UpsertCommitteeSocialIconsFormSectionProps = {
  control: Control<UpsertCommitteeFormValues>;
};

const UpsertCommitteeSocialIconsFormSection: FC<
  UpsertCommitteeSocialIconsFormSectionProps
> = ({ control }) => {
  const {
    fields: socialIcons,
    append: addSocialIcon,
    swap: swapSocialIcons,
    remove: removeSocialIcon,
  } = useFieldArray({
    name: "socialIcons",
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
              order: 99,
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
      {socialIcons.length === 0 ? (
        <FormDescription className="text-xs">
          Inga sociala länkar. Lägg till första genom att klicka på +
        </FormDescription>
      ) : (
        <div className="flex flex-col gap-2">
          {socialIcons.map(({ iconAndUrl: { iconVariant, url }, id }, idx) => {
            return (
              <div
                key={id}
                className="space-y-4 rounded border px-2 py-4 shadow"
              >
                <UpsertCommitteeSocialIconSelect
                  control={control}
                  defaultValue={iconVariant}
                  label="Ikon"
                  name={`socialIcons.${idx}.iconAndUrl.iconVariant`}
                />
                <BasicInput
                  control={control}
                  defaultValue={url}
                  label="Url"
                  name={`socialIcons.${idx}.iconAndUrl.url`}
                />
                <div className="flex flex-row justify-end gap-2">
                  <Button
                    disabled={idx === 0}
                    onClick={() => swapSocialIcons(idx, idx - 1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <FaArrowUp />
                    <p className="sr-only">Flytta uppåt</p>
                  </Button>
                  <Button
                    disabled={idx === socialIcons.length - 1}
                    onClick={() => swapSocialIcons(idx, idx + 1)}
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

export default UpsertCommitteeSocialIconsFormSection;
