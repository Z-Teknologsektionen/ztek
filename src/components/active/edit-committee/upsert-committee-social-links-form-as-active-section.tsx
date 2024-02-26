import type { FC } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";
import { BasicInput } from "~/components/forms/basic-input";
import SelectCommitteeSocialIcon from "~/components/forms/select-committee-social-icon";
import { Button } from "~/components/ui/button";
import { FormDescription } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { TooltipProvider } from "~/components/ui/tooltip";
import { MAX_ORDER_NUMBER } from "~/constants/committees";
import type { UpsertCommitteeAsActiveFormValues } from "./upsert-committee-as-active-form";

type UpsertCommitteeSocialLinksFormAsActiveSectionProps = {
  control: Control<UpsertCommitteeAsActiveFormValues>;
};

const UpsertCommitteeSocialLinksFormAsActiveSection: FC<
  UpsertCommitteeSocialLinksFormAsActiveSectionProps
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
                order: MAX_ORDER_NUMBER,
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
            {socialLinks.map(
              ({ iconAndUrl: { iconVariant, url }, id }, idx) => {
                return (
                  <div
                    key={id}
                    className="flex flex-row justify-between gap-2 px-2"
                  >
                    <div className="flex gap-2">
                      <SelectCommitteeSocialIcon
                        control={control}
                        defaultValue={iconVariant}
                        label="Ikon"
                        name={`socialLinks.${idx}.iconAndUrl.iconVariant`}
                      />
                      <BasicInput
                        className="flex-shrink"
                        control={control}
                        defaultValue={url}
                        label="Url"
                        name={`socialLinks.${idx}.iconAndUrl.url`}
                      />
                    </div>
                    <div className="flex items-end gap-2 pb-4">
                      <FaArrowUp
                        className="cursor-pointer hover:fill-zLightGray"
                        onClick={() =>
                          idx === 0 ? undefined : swapSocialLinks(idx, idx - 1)
                        }
                        size={15}
                      />
                      <FaArrowDown
                        className="cursor-pointer hover:fill-zLightGray"
                        onClick={() =>
                          idx === socialLinks.length - 1
                            ? undefined
                            : swapSocialLinks(idx, idx + 1)
                        }
                        size={15}
                      />
                      <FaTrash
                        className="cursor-pointer hover:fill-zRed"
                        onClick={() => removeSocialIcon(idx)}
                        size={15}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default UpsertCommitteeSocialLinksFormAsActiveSection;
