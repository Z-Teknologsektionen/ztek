import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";
import { upsertMemberBaseSchema } from "~/server/api/helpers/schemas/members";
import { api, type RouterOutputs } from "~/utils/api";
import localeObject from "~/utils/dayjs";
import { getBase64WebPStringFromFileInput } from "~/utils/utils";
import { NumberInput } from "../forms/NumberInput";
import { TextInput } from "../forms/TextInput";
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
  const [newImage, setNewImage] = useState<string>(member.image);

  const { mutate: mutateMember } = api.member.updateMemberAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar medlem..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      refetch();
    },
    onSuccess: ({ role }) => {
      toast.success(`Medlem med roll "${role}" har uppdaterats!`);
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

  const form = useForm<z.infer<typeof upsertMemberBaseSchema>>({
    resolver: zodResolver(upsertMemberBaseSchema),
    defaultValues: member,
  });

  const onSubmit = (values: z.infer<typeof upsertMemberBaseSchema>): void =>
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
          <TextInput control={form.control} label="Namn" name="name" />
          <TextInput
            control={form.control}
            label="Kommitténamn"
            name="nickName"
          />
          <TextInput
            control={form.control}
            description="Du behöver inte fylla i detta. Kommer visas publikt på organsidan."
            label="Telefonnummer"
            name="phone"
            type="tel"
          />
          <NumberInput
            control={form.control}
            defaultValue={0}
            description="Används för att bestämma vilken ordning organets medlemmar ska visas i"
            label="Ordning"
            max={99}
            min={0}
            name="order"
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
                            setNewImage(val);
                            form.setValue("image", val);
                          })
                          .catch(() => {
                            setNewImage("");
                            form.setValue("image", "");
                          });
                      }}
                      type="file"
                      value={""}
                    />
                    <Button
                      className="w-44"
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
