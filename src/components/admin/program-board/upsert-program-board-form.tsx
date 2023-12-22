import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import { TextInput } from "~/components/forms/TextInput";
// import { TextInput } from "~/components/forms/textInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createProgramBoardMemberSchema } from "~/server/api/helpers/schemas/programBoardMembers";

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
  type: "create" | "update";
}

const UpsertProgramBoardMemberForm: FC<IUpsertProgramBoardMemberForm> = ({
  defaultValues,
  type,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof createProgramBoardMemberSchema>>({
    resolver: zodResolver(createProgramBoardMemberSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <TextInput label="Namn" name="name" />
          <TextInput
            label="Titel"
            name="role"
            placeholder="Programansvarig/Studievägledare/..."
          />
          <TextInput
            description="Måste inte vara med"
            label="Telefonnummer"
            name="phone"
          />
          <TextInput
            label="Epost"
            name="email"
            placeholder="lucky@ztek.se"
            type="email"
          />
          <TextInput
            description="Används för att länka till personens sida på Chalmers hemsida"
            label="Url"
            name="url"
            placeholder="https://chalmers.se/lucky"
            type="url"
          />
          <NumberInput
            description="Används för att bestämma vilken ordning personen ska visas i.
                  Lägre värde visas till vänster."
            label="Ordning"
            max={99}
            min={0}
            name="order"
          />
          <ImageInput
            defaultImage={defaultValues.image}
            label="Bild"
            name="image"
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
            {type === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertProgramBoardMemberForm;
// interface ITextInput {
//   description?: string;
//   label: string;
//   name: string;
//   placeholder?: string;
// }

// export const TextInput: FC<ITextInput> = ({
//   label,
//   name,
//   description,
//   placeholder,
// }) => {
//   const { control } = useFormContext();
//   return (
//     <>
//       <FormField
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{label}</FormLabel>
//             <FormControl>
//               <Input placeholder={placeholder} {...field} />
//             </FormControl>
//             <FormDescription>{description}</FormDescription>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </>
//   );
// };
