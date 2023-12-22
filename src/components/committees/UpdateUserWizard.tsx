import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { updateMemberAsActiveSchema } from "~/server/api/helpers/zodScheams";
import { api, type RouterOutputs } from "~/utils/api";
import localeObject from "~/utils/dayjs";
import { getBase64WebPStringFromFileInput } from "~/utils/utils";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CommitteeImage from "./CommitteeImage";

dayjs.extend(relativeTime);
dayjs.locale(localeObject);

interface IUpdateUserWizard {
  member: RouterOutputs["committee"]["getOneByEmail"]["members"][0];
  refetch: () => void;
}
export const UpdateUserWizard: FC<IUpdateUserWizard> = ({
  member,
  refetch,
}) => {
  const { mutate: mutateMember } = api.member.updateMemberAsActive.useMutation({
    onSettled: () => refetch(),
  });

  const form = useForm<z.infer<typeof updateMemberAsActiveSchema>>({
    resolver: zodResolver(updateMemberAsActiveSchema),
    defaultValues: member,
  });

  const [newImage, setNewImage] = useState<string | undefined>(member.image);

  const onSubmit = (values: z.infer<typeof updateMemberAsActiveSchema>): void =>
    void mutateMember({
      id: member.id,
      ...values,
    });

  return (
    <Form {...form}>
      <form
        className="space-y-4 rounded border p-2 shadow"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CommitteeImage
          alt={`Profilbild på ${member.role}`}
          filename={newImage}
        />
        <div className="space-y-2 p-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Namn</FormLabel>
                <FormControl>
                  <Input placeholder="Namn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Smeknamn</FormLabel>
                <FormControl>
                  <Input placeholder="Smeknamn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
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
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ordning</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    max={99}
                    min={0}
                    onChange={(event) =>
                      form.setValue("order", event.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Används för att bestämma vilken ordning organets medlemmar ska
                  visas i
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <p className="text-sm">
            Senast updaterad: {dayjs(member.updatedAt).fromNow()}
          </p>
          <p className="text-xs">Roll: {member.role}</p>
          <p className="text-xs">Email: {member.email}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              form.reset();
              setNewImage(member.image);
            }}
            type="button"
            variant="outline"
          >
            Återställ
          </Button>
          <Button type="submit">Uppdatera</Button>
        </div>
      </form>
    </Form>
  );
};
