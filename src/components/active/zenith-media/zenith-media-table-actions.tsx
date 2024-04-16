import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteZenithMediaAsAuthed,
  useUpdateZenithMediaAsAuthed,
} from "~/hooks/mutations/useMutateZenithMedia";
import { handleUpdateZenithMediaFile } from "~/utils/sftp/handle-update-zenith-media-file";
import type { ZenithMediaType } from "./zenith-media-columns";

export const ZenithMediaTableActions: FC<ZenithMediaType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateZenithMedia } = useUpdateZenithMediaAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteZenithMedia } = useDeleteZenithMediaAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertZenithMediaForm
            key={id}
            defaultValues={{
              media: {
                fileInput: undefined,
                url: values.url,
              },
              ...values,
            }}
            formType="update"
            onSubmit={async (newValues) => {
              const loadningToastId = toast.loading(
                "Updaterar media.\n Detta kan ta en stund!",
              );

              try {
                newValues.media.url = await handleUpdateZenithMediaFile({
                  newFile: newValues.media.fileInput,
                  newTitle: newValues.title,
                  newUrl: newValues.media.url,
                  oldTitle: values.title,
                  oldUrl: values.url,
                });

                if (!newValues.media.url) {
                  return toast.error(
                    "Något gick fel vid hantering av ny eller gammal media. Försök igen senare eller kontakta webbgruppen",
                  );
                }

                toast.success("Median uppdaterad!");

                updateZenithMedia({
                  id: id,
                  url: newValues.media.url,
                  ...newValues,
                });
              } catch (error) {
                if (error instanceof Error) {
                  return toast.error(error.message);
                }

                toast.error(
                  "Något gick fel. Försök igen senare eller kontakta webbgruppen",
                );
              } finally {
                toast.dismiss(loadningToastId);
              }
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Uppdatera ${values.title}`}
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteZenithMedia({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
