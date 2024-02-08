import type { FieldPath, FieldValues, Path } from "react-hook-form";
import type { IBasicFormField } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { getBase64WebPStringFromFileInput } from "~/utils/utils";

interface IUpdateUserImageFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName> {
  setValue: (arg0: string) => void;
}

const UpdateUserImageFormField = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  control,
  label,
  name,
  setValue,
}: IUpdateUserImageFormField<TFieldValues, TName>): React.JSX.Element => {
  return (
    <FormField
      control={control}
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
                  getBase64WebPStringFromFileInput(event)
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
        </FormItem>
      )}
    />
  );
};

export default UpdateUserImageFormField;
