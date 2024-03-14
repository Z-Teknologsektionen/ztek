import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldSelectCommitteeSocialIcon from "~/components/forms/form-field-select-committee-social-icon";
import { Button } from "~/components/ui/button";
import { FormDescription } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { TooltipProvider } from "~/components/ui/tooltip";
import type { UpsertCommitteeAsActiveFormValues } from "./upsert-committee-as-active-form";

type UpsertCommitteeSocialLinksFormAsActiveSectionProps = {
  form: UseFormReturn<UpsertCommitteeAsActiveFormValues>;
};

const UpsertCommitteeSocialLinksFormAsActiveSection: FC<
  UpsertCommitteeSocialLinksFormAsActiveSectionProps
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
  const ICON_SIZE = 15;

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Label>Sociala länkar (valfri)</Label>
          <Button
            className="ml-2 h-8 px-2 lg:px-3"
            onClick={() =>
              addSocialIcon({
                iconAndUrl: {
                  iconVariant: "QUESTIONMARK",
                  url: "",
                },
                linkText: "",
              })
            }
            size="lg"
            type="button"
            variant="outline"
          >
            Ny social länk
          </Button>
        </div>
        {socialLinks.length === 0 ? (
          <FormDescription className="text-xs">
            Inga sociala länkar.
          </FormDescription>
        ) : (
          <div className="flex flex-col gap-2">
            {socialLinks.map(({ id }, idx) => {
              return (
                <div
                  key={id}
                  className="flex flex-row justify-between gap-2 px-2"
                >
                  <div className="flex gap-2">
                    <div className="w-36">
                      <FormFieldSelectCommitteeSocialIcon
                        form={form}
                        label="Ikon"
                        name={`socialLinks.${idx}.iconAndUrl.iconVariant`}
                      />
                    </div>
                    <FormFieldInput
                      className="flex-shrink"
                      form={form}
                      label="Url"
                      name={`socialLinks.${idx}.iconAndUrl.url`}
                      type="url"
                    />
                  </div>
                  <div className="flex items-end gap-2 pb-4">
                    <FaArrowUp
                      className="cursor-pointer hover:fill-zLightGray"
                      onClick={() =>
                        idx === 0 ? undefined : swapSocialLinks(idx, idx - 1)
                      }
                      size={ICON_SIZE}
                    />
                    <FaArrowDown
                      className="cursor-pointer hover:fill-zLightGray"
                      onClick={() =>
                        idx === socialLinks.length - 1
                          ? undefined
                          : swapSocialLinks(idx, idx + 1)
                      }
                      size={ICON_SIZE}
                    />
                    <FaTrash
                      className="cursor-pointer hover:fill-zRed"
                      onClick={() => removeSocialIcon(idx)}
                      size={ICON_SIZE}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default UpsertCommitteeSocialLinksFormAsActiveSection;
