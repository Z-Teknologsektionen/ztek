import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { MIN_MEDIA_ORDER_NUMBER } from "~/constants/zenith-media";
import { env } from "~/env.mjs";
import {
  useDeleteZenithMediaAsAuthed,
  useUpdateZenithMediaAsAuthed,
} from "~/hooks/mutations/useMutateZenithMedia";
import { handleCreateZenithMediaFile } from "~/utils/sftp/handle-create-sftp-file";
import { handleDeleteSftpFile } from "~/utils/sftp/handle-delete-sftp-file";
import { handleRenameSftpFile } from "~/utils/sftp/handle-rename-sftp-file";
import { updateZenithMediaFilename } from "~/utils/string-utils";
import type { ZenithMediaType } from "./zenith-media-columns";

export const ZenithMediaTableActions: FC<ZenithMediaType> = ({
  id,
  ...currentValues
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
                file: undefined,
                url: currentValues.url,
              },
              ...currentValues,
            }}
            formType="update"
            onSubmit={async ({
              coverImage,
              media: { file: newFile, url: newUrl },
              title: newTitle,
              year,
              order,
            }) => {
              const oldUrl = currentValues.url;
              const hasNewFile = newFile !== undefined;

              const loadingToastId = toast.loading(
                "Uppdaterar mediet.\n Detta kan ta en stund!",
              );

              try {
                if (oldUrl.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)) {
                  const oldFilename = oldUrl.split("/").pop() || "";
                  const newFilename = updateZenithMediaFilename({
                    title: newTitle,
                    oldFilename,
                    order: order || MIN_MEDIA_ORDER_NUMBER,
                    year,
                  });

                  if (hasNewFile || newUrl !== oldUrl) {
                    await handleDeleteSftpFile({ url: oldUrl }, true);
                  } else if (oldFilename !== newFilename) {
                    newUrl = await handleRenameSftpFile({
                      oldUrl: oldUrl,
                      newFilename,
                    });
                  }
                }

                if (hasNewFile) {
                  newUrl = await handleCreateZenithMediaFile({
                    file: newFile,
                    title: newTitle,
                    order: order || MIN_MEDIA_ORDER_NUMBER,
                    year,
                  });
                }

                if (!newUrl) {
                  return toast.error(
                    "Något gick fel vid hantering av ny eller gammal media. Försök igen senare eller kontakta webbgruppen",
                  );
                }

                toast.success("Mediet uppdaterad!");

                updateZenithMedia({
                  id: id,
                  url: newUrl,
                  coverImage,
                  title: newTitle,
                  year,
                  order,
                });
              } catch (error) {
                if (error instanceof Error) {
                  return toast.error(error.message);
                }

                toast.error(
                  "Något gick fel. Försök igen senare eller kontakta webbgruppen",
                );
              } finally {
                toast.dismiss(loadingToastId);
              }
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Uppdatera ${currentValues.title}`}
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteZenithMedia({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
