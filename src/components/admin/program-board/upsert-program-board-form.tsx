import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import CommitteeImage from "~/components/organ/CommitteeImage";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { createProgramBoardMemberSchema } from "~/server/api/helpers/zodScheams";
import { getBase64WebPStringFromFileInput } from "~/utils/utils";

interface IUpsertProgramBoardMemberForm {
  defaultValues: {
    description?: string;
    email?: string;
    image?: string;
    name?: string;
    order?: number;
    role?: string;
    slug?: string;
  };
  onSubmit: (props: z.infer<typeof createProgramBoardMemberSchema>) => void;
}

const UpsertProgramBoardMemberForm: FC<IUpsertProgramBoardMemberForm> = ({
  defaultValues,
  onSubmit,
}) => {
  const [newImage, setNewImage] = useState<string | undefined>(
    defaultValues.image,
  );
  const form = useForm<z.infer<typeof createProgramBoardMemberSchema>>({
    resolver: zodResolver(createProgramBoardMemberSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Programansvarig/Studievägledare"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonnummer</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Måste inte vara med</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Epost</FormLabel>
                <FormControl>
                  <Input placeholder="lucky@ztek.se" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input placeholder="www.chalmers.se" type="url" {...field} />
                </FormControl>
                <FormDescription>
                  Används för att länka till personens sida på Chalmers hemsida
                </FormDescription>
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
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Används för att bestämma vilken ordning personen ska visas i.
                  Lägre värde visas till vänster.
                </FormDescription>
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
                <CommitteeImage alt="" filename={newImage} />
                <FormControl>
                  <div className="flex w-auto gap-2">
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
                      className="w-[25%]"
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
        <DialogFooter>
          <Button
            onClick={() => {
              form.reset(defaultValues);
            }}
            type="button"
            variant={"outline"}
          >
            Rensa
          </Button>

          <Button type="submit" variant={"default"}>
            Skapa
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertProgramBoardMemberForm;
