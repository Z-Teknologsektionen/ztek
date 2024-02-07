import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";

import { MdDelete, MdEdit } from "react-icons/md";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import type { OldCommitteeType } from "./old-committee-columns";
import UpsertOldCommitteeForm from "./upsert-old-committee-form";
export const OldCommitteeTableActions: FC<OldCommitteeType> = ({
  id,
  ...values
}) => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateOldCommittee } = api.oldCommittee.updateOne.useMutation(
    {
      onMutate: () => toast.loading("Uppdaterar organet..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success(`Patetorganet har uppdaterats!`);
        setIsOpen(false);
        void ctx.oldCommittee.invalidate();
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

  const { mutate: deleteOldCommittee } = api.oldCommittee.deleteOne.useMutation(
    {
      onMutate: () => toast.loading("Raderar patetorgan..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.oldCommittee.invalidate();
      },
      onSuccess: () => toast.success("Patetorganet har raderats!"),
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    },
  );

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertOldCommitteeForm
            key={id}
            defaultValues={{
              ...values,
              members: values.members.map((member) => ({
                ...member,
                nickName: member.nickName || undefined,
                role: member.role || undefined,
              })),
            }}
            formType="update"
            onSubmit={(updatedValues) =>
              updateOldCommittee({
                id: id,
                ...updatedValues,
              })
            }
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera patetorgan"
        trigger={
          <Button className="mx-2 h-6" size={"sm"} variant="outline">
            <MdEdit
              color="orange"
              onSelect={(e) => e.preventDefault()}
              size={15}
            >
              Redigera
            </MdEdit>
          </Button>
        }
      />
      <DeleteDialog
        onSubmit={() => deleteOldCommittee({ id })}
        trigger={
          <Button className="h-6" size={"sm"} variant="outline">
            <MdDelete
              className="mx-1"
              color="red"
              onSelect={(e) => e.preventDefault()}
              size={15}
            >
              Radera
            </MdDelete>
          </Button>
        }
      ></DeleteDialog>
    </div>
    // <DropdownMenu>
    //   <DropdownMenuTrigger className="ml-auto mr-2 flex" asChild>
    //     <Button className="h-8 w-8 p-0" variant="ghost">
    //       <span className="sr-only">Öppna meny</span>
    //       <MoreHorizontal className="h-4 w-4" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <UpsertDialog
    //       form={
    //         <UpsertOldCommitteeForm
    //           key={id}
    //           defaultValues={{
    //             ...values,
    //             members: values.members.map((member) => ({
    //               ...member,
    //               nickName: member.nickName || undefined,
    //               role: member.role || undefined,
    //             })),
    //           }}
    //           formType="update"
    //           onSubmit={(updatedValues) =>
    //             updateOldCommittee({
    //               id: id,
    //               ...updatedValues,
    //             })
    //           }
    //         />
    //       }
    //       isOpen={isOpen}
    //       setIsOpen={setIsOpen}
    //       title="Uppdatera patetorgan"
    //       trigger={
    //         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    //           Redigera
    //         </DropdownMenuItem>
    //       }
    //     />
    //     <DeleteDialog
    //       onSubmit={() => deleteOldCommittee({ id })}
    //       trigger={
    //         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    //           Radera
    //         </DropdownMenuItem>
    //       }
    //     ></DeleteDialog>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};
