import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import UpsertCommitteeForm from "~/components/active/committees/upsert-committee-form";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  useDeleteCommitteeAsAdmin,
  useUpdateCommitteeAsAdmin,
} from "~/hooks/mutations/useMutateCommittee";
import type { CommitteeType } from "./committee-columns";

export const CommitteeTableActions: FC<CommitteeType> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateCommittee } = useUpdateCommitteeAsAdmin({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteMember } = useDeleteCommitteeAsAdmin({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpsertDialog
          form={
            <UpsertCommitteeForm
              key={id}
              defaultValues={{
                ...values,
                socialLinks: values.socialLinks.map(
                  ({ iconVariant, order, url }) => ({
                    iconAndUrl: {
                      iconVariant,
                      url,
                    },
                    order,
                  }),
                ),
              }}
              formType="update"
              onSubmit={(updatedValues) =>
                updateCommittee({
                  id: id,
                  ...updatedValues,
                })
              }
            />
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Uppdatera organ"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteMember({ id })}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Radera
            </DropdownMenuItem>
          }
        ></DeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
