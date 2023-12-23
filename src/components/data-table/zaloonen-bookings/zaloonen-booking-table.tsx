import type { FC } from "react";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { SortableFilterableDataTable } from "~/components/data-table/zaloonen-bookings/sortable-filterable-data-table";
import UpsertZaloonenBookingForm from "~/components/forms/zaloonen-booking-form";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { columns } from "./columns";

const ZaloonenBookingTable: FC = () => {
  const ctx = api.useUtils();

  const {
    mutate: createNewZaloonenBooking,
    isLoading: creatingNewZaloonenBooking,
  } = api.zaloonenBooking.createZaloonenBooking.useMutation({
    onMutate: () => toast.loading("Skapar ny bokning..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: ({ eventName }) => {
      toast.success(`Bokningen ${eventName} har skapats!`);
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

  const { data, isLoading, isError } =
    api.zaloonenBooking.getAllAsAdmin.useQuery();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <UpsertDialog
            form={
              <UpsertZaloonenBookingForm
                key={"new"}
                defaultValues={{}}
                onSubmit={(values) => createNewZaloonenBooking(values)}
                type="create"
              />
            }
            title="Ny bokning"
            trigger={
              <Button
                disabled={creatingNewZaloonenBooking}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa ny bokning
              </Button>
            }
          />
        </div>
      </div>
      {data && (
        <SortableFilterableDataTable
          columns={columns}
          data={data}
          error={isError}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default ZaloonenBookingTable;
