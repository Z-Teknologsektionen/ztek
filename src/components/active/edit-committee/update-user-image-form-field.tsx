import type { FieldValues } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
} from "~/constants/committees";
import type { IFormFieldDefaults } from "~/types/form-types";
import { getBase64WebPStringFromFileInput } from "~/utils/get-base64-webp-string-from-file-input";

interface IUpdateUserImageFormField<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  setValue: (arg0: string) => void;
}

const UpdateUserImageFormField = <TFieldValues extends FieldValues>({
  form,
  description,
  disabled,
  label,
  name,
  setValue,
}: IUpdateUserImageFormField<TFieldValues>): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                {...field}
                accept="image/png, image/jpeg"
                className="text-transparent"
                onChange={(event) => {
                  getBase64WebPStringFromFileInput({
                    event,
                    maxHeight: COMMITTEE_IMAGE_SIZE,
                    maxWidth: COMMITTEE_IMAGE_SIZE,
                    quality: COMMITTEE_IMAGE_QUALITY,
                  })
                    .then((val) => {
                      setValue(val);
                    })
                    .catch(() => {
                      setValue("");
                    });
                }}
                type="file"
                value={""}
              />
              <Button
                className="w-44"
                onClick={() => {
                  setValue("");
                }}
                type="button"
                variant="ghost"
              >
                Rensa bild
              </Button>
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default UpdateUserImageFormField;
