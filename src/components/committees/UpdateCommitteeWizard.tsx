import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import type { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import CommitteeImage from "~/components/committees/CommitteeImage";
import { updateCommitteeAsUserSchema } from "~/server/api/helpers/zodScheams";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { getBase64WebPStringFromFileInput } from "~/utils/utils";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface IUpdateCommitteeWizard {
  committee: RouterOutputs["committee"]["getOneByEmail"];
  refetchCommittee: () => void;
}
export const UpdateCommitteeWizard: FC<IUpdateCommitteeWizard> = ({
  committee,
  refetchCommittee,
}) => {
  const [newImage, setNewImage] = useState<string | undefined>(committee.image);

  const { mutate: updateCommittee } =
    api.committee.updateCommitteeAsUser.useMutation({
      onSettled: () => refetchCommittee(),
    });

  const form = useForm<z.infer<typeof updateCommitteeAsUserSchema>>({
    resolver: zodResolver(updateCommitteeAsUserSchema),
    defaultValues: committee,
  });

  const onSubmit = (
    values: z.infer<typeof updateCommitteeAsUserSchema>,
  ): void =>
    void updateCommittee({
      id: committee.id,
      ...values,
    });

  return (
    <>
      <Form {...form}>
        <form
          className="w-full space-y-4 rounded border p-2 shadow"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row">
            <div className="flex w-fit flex-col justify-between">
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
                            getBase64WebPStringFromFileInput(event)
                              .then((val) => {
                                field.value = val;
                                setNewImage(field.value);
                                form.setValue("image", val);
                              })
                              .catch(() => {
                                field.value = undefined;
                                setNewImage(field.value);
                              });
                          }}
                          type="file"
                          value={""}
                        />
                        <Button
                          className="w-44"
                          onClick={() => setNewImage(undefined)}
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
    </>
  );
};
