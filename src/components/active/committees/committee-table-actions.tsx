import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import toast from "react-hot-toast";
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
import { api } from "~/utils/api";
import type { CommitteeType } from "./committee-columns";

export const CommitteeTableActions: FC<CommitteeType> = ({ id, ...values }) => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateCommittee } = api.committee.updateCommittee.useMutation(
    {
      onMutate: () => toast.loading("Uppdaterar organet..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success(`Organet har uppdaterats!`);
        setIsOpen(false);
        void ctx.committee.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    },
  );

  const { mutate: deleteMember } = api.committee.deleteCommittee.useMutation({
    onMutate: () => toast.loading("Raderar medlem..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.member.invalidate();
      void ctx.committee.invalidate();
    },
    onSuccess: () => toast.success("Medlem har raderats!"),
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

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