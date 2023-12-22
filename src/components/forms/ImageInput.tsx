import { useState, type FC } from "react";
import { useFormContext } from "react-hook-form";
import { getBase64WebPStringFromFileInput } from "~/utils/utils";
import CommitteeImage from "../committees/CommitteeImage";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface IImageInput {
  defaultImage?: string;
  description?: string;
  label: string;
  name: string;
}

export const ImageInput: FC<IImageInput> = ({
  label,
  name,
  description,
  defaultImage = "",
}) => {
  const [newImage, setNewImage] = useState<string>(defaultImage);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <CommitteeImage alt="" filename={newImage} />
          <FormControl>
            <div className="flex w-auto gap-2">
              <Input
                {...field}
                accept="image/png, image/jpeg"
                className="text-transparent hover:cursor-pointer"
                onChange={(event) => {
                  getBase64WebPStringFromFileInput(event)
                    .then((val) => {
                      field.value = val;
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      setNewImage(field.value);
                      form.setValue("image", val);
                    })
                    .catch(() => {
                      field.value = "";
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      setNewImage(field.value);
                    });
                }}
                type="file"
                value={""}
              />
              <Button
                className="w-[25%]"
                onClick={() => {
                  setNewImage("");
                  form.setValue("image", "");
                }}
                type="button"
                variant="ghost"
              >
                Rensa bild
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
