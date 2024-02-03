"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertMemberForm } from "~/components/active/members/upsert-member-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

interface OldCommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const OldCommitteeTableToolbar = <TData,>({
  table,
}: OldCommitteeTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const { data: committees } =
  //   api.committee.getAllCommitteeNamesAsAdmin.useQuery();
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewUser, isLoading: creatingNewUser } =
    api.member.createMemberAsAdmin.useMutation({
      onMutate: () => toast.loading("Skapar ny medlem..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ name: userName, committee: { name: committeeName } }) => {
        toast.success(`${userName} i ${committeeName} har skapats!`);
        setIsOpen(false);
        void ctx.committee.invalidate();
        void ctx.member.invalidate();
        void ctx.user.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const nameColumn = table.getColumn("Namn");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              nameColumn?.setFilterValue(event.target.value)
            }
            placeholder="Filtrera på namn..."
            value={(nameColumn?.getFilterValue() as string) ?? ""}
          />
          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() => table.resetColumnFilters()}
              variant="outline"
            >
              Återställ
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertMemberForm
                key={"new"}
                defaultValues={{}}
                formType="create"
                onSubmit={(values) => createNewUser(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Nytt patetår"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewUser}
                size="lg"
                type="button"
                variant="outline"
              >
                Lägg till
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
