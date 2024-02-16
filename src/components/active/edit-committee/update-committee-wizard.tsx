import dayjs from "dayjs";
import type { FC } from "react";
import { useState } from "react";
import type { z } from "zod";
import CommitteeImage from "~/components/committees/committee-image";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
} from "~/constants/committees";
import { useUpdateCommitteeAsActive } from "~/hooks/mutations/useMutateCommittee";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { upsertCommitteeBaseSchema } from "~/server/api/helpers/schemas/committees";
import type { RouterOutputs } from "~/utils/api";
import { getBase64WebPStringFromFileInput } from "~/utils/get-base64-webp-string-from-file-input";

type UpdateCommitteeWizardProps = {
  committee: RouterOutputs["committee"]["getOneByIdAsActive"];
};

export const UpdateCommitteeWizard: FC<UpdateCommitteeWizardProps> = ({
  committee,
}) => {
  const [newImage, setNewImage] = useState<string | undefined>(committee.image);

  const { mutate: updateCommittee } = useUpdateCommitteeAsActive();

  const form = useFormWithZodSchema({
    schema: upsertCommitteeBaseSchema,
    defaultValues: committee,
  });

  const onSubmit = (values: z.infer<typeof upsertCommitteeBaseSchema>): void =>
    updateCommittee({ id: committee.id, ...values });

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4 rounded border p-2 shadow"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row">
          <div className="flex w-fit flex-col justify-between gap-4">
            <CommitteeImage alt="" filename={newImage} />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-72 gap-2">
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
                              field.value = val;
                              setNewImage(field.value);
                              form.setValue("image", val);
                            })
                            .catch(() => {
                              field.value = "";
                              setNewImage(field.value);
                            });
                        }}
                        type="file"
                        value={""}
                      />
                      <Button
                        className="w-44"
                        onClick={() => setNewImage("")}
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
          </div>
          <div className="w-full space-y-2 p-1">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Beskrivning</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-64 resize-none"
                      placeholder="Beskrivning"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <p className="text-sm">
            Senast updaterad: {dayjs(committee.updatedAt).fromNow()}
          </p>
          <div>
            <Button
              onClick={() => {
                form.reset();
                setNewImage(committee.image);
              }}
              type="button"
              variant="outline"
            >
              Återställ
            </Button>
            <Button type="submit">Uppdatera</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
