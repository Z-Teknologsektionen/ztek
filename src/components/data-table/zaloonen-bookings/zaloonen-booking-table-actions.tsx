import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
import DeleteDialog from "~/components/admin/delete-dialog";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import UpsertZaloonenBookingForm from "~/components/forms/zaloonen-booking-form";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/utils/api";

export const ZaloonenBookingTableActions: FC<{
  eventDescription: string;
  eventName: string;
  hasServingPermit: boolean;
  id: string;
  inChargeEmail: string;
  inChargeName: string;
  inChargePhone: string;
  organizerEmail: string;
  organizerName: string;
  organizerPhone: string;
  primaryEndDate: Date;
  primaryStartDate: Date;
  secondaryEndDate: Date;
  secondaryStartDate: Date;
}> = ({ id, ...values }) => {
  const ctx = api.useUtils();

  const { mutate: updateZaloonenBooking } =
    api.zaloonenBooking.updateOneAsAdmin.useMutation({
      onMutate: () => toast.loading("Uppdaterar boking..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success(`Bokningen har uppdaterats!`);
        void ctx.zaloonenBooking.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const { mutate: deleteZaloonenBooking } =
    api.zaloonenBooking.deleteZaloonenBooking.useMutation({
      onMutate: () => toast.loading("Raderar bokning..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.zaloonenBooking.invalidate();
      },
      onSuccess: () => toast.success("Bokningen har raderats!"),
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
            <UpsertZaloonenBookingForm
              key={id}
              defaultValues={values}
              onSubmit={(updatesValues) =>
                updateZaloonenBooking({
                  id: id,
                  ...updatesValues,
                })
              }
              type="update"
            />
          }
          title="Uppdatera bokning"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteZaloonenBooking({ id })}
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
