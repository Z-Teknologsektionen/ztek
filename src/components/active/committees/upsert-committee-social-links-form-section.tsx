import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from "react-icons/fa6";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldSelectCommitteeSocialIcon from "~/components/forms/form-field-select-committee-social-icon";
import ButtonWithIconAndTooltip from "~/components/tooltips/button-with-icon-and-tooltip";
import { FormDescription } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import type { UpsertCommitteeFormValues } from "./upsert-committee-form";

type UpsertCommitteeSocialLinksFormSectionProps = {
  form: UseFormReturn<UpsertCommitteeFormValues>;
};

const UpsertCommitteeSocialLinksFormSection: FC<
  UpsertCommitteeSocialLinksFormSectionProps
> = ({ form }) => {
  const {
    fields: socialLinks,
    append: addSocialIcon,
    swap: swapSocialLinks,
    remove: removeSocialIcon,
  } = useFieldArray({
    name: "socialLinks",
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <Label>Sociala länkar (valfri)</Label>
        <ButtonWithIconAndTooltip
          icon={FaPlus}
          onClick={() =>
            addSocialIcon({
              iconAndUrl: {
                iconVariant: "QUESTIONMARK",
                url: "",
              },
              linkText: "",
            })
          }
          tooltipText="Lägg till ny social länk"
        />
      </div>
      {socialLinks.length === 0 ? (
        <FormDescription className="text-xs">
          Inga sociala länkar. Lägg till första genom att klicka på +
        </FormDescription>
      ) : (
        <div className="flex flex-col gap-2">
          {socialLinks.map(({ id }, idx) => {
            return (
              <div
                key={id}
                className="space-y-4 rounded border px-2 py-4 shadow"
              >
                <FormFieldSelectCommitteeSocialIcon
                  form={form}
                  label="Ikon"
                  name={`socialLinks.${idx}.iconAndUrl.iconVariant`}
                />
                <FormFieldInput
                  form={form}
                  label="Url"
                  name={`socialLinks.${idx}.iconAndUrl.url`}
                  type="url"
                />
                <div className="flex flex-row justify-end gap-2">
                  <ButtonWithIconAndTooltip
                    disabled={idx === 0}
                    icon={FaArrowUp}
                    onClick={() => swapSocialLinks(idx, idx - 1)}
                    tooltipText="Flytta uppåt"
                  />
                  <ButtonWithIconAndTooltip
                    disabled={idx === socialLinks.length - 1}
                    icon={FaArrowDown}
                    onClick={() => swapSocialLinks(idx, idx + 1)}
                    tooltipText="Flytta nedåt"
                  />
                  <ButtonWithIconAndTooltip
                    icon={FaTrash}
                    onClick={() => removeSocialIcon(idx)}
                    tooltipText="Radera social länk"
                  />
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
