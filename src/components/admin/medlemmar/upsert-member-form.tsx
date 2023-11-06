import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { createNewMemberSchema } from "~/server/api/helpers/zodScheams";
import { api } from "~/utils/api";
import { cn } from "~/utils/utils";

interface IUpsertMemberForm {
  defaultValues: {
    committeeId?: string;
    email?: string;
    name?: string;
    nickName?: string;
    order?: number;
    phone?: string;
    role?: string;
  };
  onSubmit: (props: z.infer<typeof createNewMemberSchema>) => void;
}

export const UpsertMemberForm: FC<IUpsertMemberForm> = ({
  defaultValues: {
    order = 0,
    committeeId = undefined,
    email = "",
    name = undefined,
    nickName = undefined,
    phone = undefined,
    role = "",
  },
  onSubmit,
}) => {
  const defaultValues = {
    order,
    committeeId,
    email,
    name,
    nickName,
    role,
    phone,
  };

  const form = useForm<z.infer<typeof createNewMemberSchema>>({
    resolver: zodResolver(createNewMemberSchema),
    defaultValues: defaultValues,
  });

  const { data: committees } = api.committee.getAllAsAdmin.useQuery();

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Epost</FormLabel>
                <FormControl>
                  <Input placeholder="Epost" type="email" {...field} />
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
                  <Input placeholder="Roll" type="string" {...field} />
                </FormControl>
                <FormDescription>Roll/post i organet</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="committeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organ</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj organ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {committees?.map(({ id, name: committeeName }) => (
                      <SelectItem key={id} value={id}>
                        {committeeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Saknar du ett organ? Du som admin han hantera alla{" "}
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "link",
                        size: "sm",
                      }),
                      "p-0",
                    )}
                    href={"/admin/organ"}
                  >
                    organ
                  </Link>
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
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Används för att bestämma vilken ordning organets medlemmar ska
                  visas i
                </FormDescription>
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
                  <Input placeholder="Telefonnummer" type="string" {...field} />
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
