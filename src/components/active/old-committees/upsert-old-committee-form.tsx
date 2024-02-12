import { zodResolver } from "@hookform/resolvers/zod";
import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { DropdownInput } from "~/components/forms/DropdownInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { createOldCommitteeSchema } from "~/server/api/helpers/schemas/oldCommittee";
import { api } from "~/utils/api";
import UpsertOldCommitteeMembersFormSection from "./upsert-old-committe-membes-section-form";

type UpsertOldCommitteeFormProps = IUpsertForm<typeof createOldCommitteeSchema>;

export type UpsertOldCommitteeFormValues = z.infer<
  typeof createOldCommitteeSchema
>;

const DEFAULT_VALUES: UpsertOldCommitteeFormProps["defaultValues"] = {
  year: new Date().getFullYear(),
  logo: "",
  image: "",
  members: [],
  name: "",
  belongsToCommitteeId: "",
};

const UpsertOldCommitteeForm: FC<UpsertOldCommitteeFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const { data: session } = useRequireAuth();
  const isAdmin = session?.user.roles.includes(AccountRoles.ADMIN);

  const dropDownMappable = isAdmin
    ? api.committee.getAllAsAdmin.useQuery().data?.map((committee) => ({
        id: committee.id,
        name: committee.name,
      })) || []
    : [];

  const form = useForm<z.infer<typeof createOldCommitteeSchema>>({
    resolver: zodResolver(createOldCommitteeSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      belongsToCommitteeId: session?.user.committeeId || "unknown",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput
            control={form.control}
            description="Ex. Zexet 22"
            label="Namn"
            name="name"
          />
          {isAdmin && (
            <DropdownInput
              control={form.control}
              disabled={false}
              label="Huvudorgan"
              mappable={dropDownMappable}
              name="belongsToCommitteeId"
              placeholder="Välj huvudorgan"
            />
          )}
          <NumberInput
            control={form.control}
            description="Används för att sortera de olika åren. Så om man satt 22/23, skriv 2022"
            label="År"
            name="year"
          />
          <UpsertOldCommitteeMembersFormSection control={form.control} />
          <ImageInput
            control={form.control}
            label="Omslagsbild (valfri)"
            name="image"
          />
          <ImageInput
            control={form.control}
            label="Logga (valfri)"
            name="logo"
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
            Återställ
          </Button>
          <Button type="submit" variant={"default"}>
            {formType === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertOldCommitteeForm;
