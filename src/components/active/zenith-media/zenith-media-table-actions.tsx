import { useState, type FC } from "react";
import toast from "react-hot-toast";
import type { z } from "zod";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { env } from "~/env.mjs";
import {
  useDeleteZenithMediaAsAuthed,
  useUpdateZenithMediaAsAuthed,
} from "~/hooks/mutations/useMutateZenithMedia";
import type { createZenithMediaClientSchema } from "~/schemas/zenith-media";
import {
  handleCreateSftpFile,
  handleDeleteSftpFile,
  handleRenameSftpFile,
} from "~/utils/sftp/api-calls";
import type { ZenithMediaType } from "./zenith-media-columns";

export type ZenithFormValuesType = z.infer<
  typeof createZenithMediaClientSchema
>;

export const ZenithMediaTableActions: FC<ZenithMediaType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const basePath = env.NEXT_PUBLIC_SFTP_BASE_URL;

  const handleUpdateZenithMediaFile = async (
    props: ZenithFormValuesType,
  ): Promise<void> => {
    //Title have changed and we have new file. Delete old one
    if (!(props.input.fileInput && props.input.fileInput[0])) {
      //No file, only rename the file
      const newName =
        props.title.toLowerCase().replace(" ", "-") +
        "." +
        values.url.split(".").pop();

      try {
        await handleRenameSftpFile(values.url, newName, "media", "true");
      } catch (err) {
        let errMessage = "Kunde inte döpa om filen från servern.";
        if (err instanceof Error) {
          errMessage += "\n" + err.message;
        }
        toast.error(errMessage);
      }
      return;
    }
    if (props.title !== values.title && values.url.startsWith(basePath)) {
      try {
        await handleDeleteSftpFile(values.url);
      } catch (err) {
        let errMessage = "Kunde inte ta bort den gamla filen från servern.";
        if (err instanceof Error) {
          errMessage += "\n" + err.message;
        }
        toast.error(errMessage);
      }
    }
    const filename =
      props.title.toLowerCase().replace(" ", "-") +
      "." +
      props.input.fileInput[0].name.split(".").pop();
    const updateToastId = toast.loading(
      `Laddar upp ${props.input.fileInput[0].name}.\n Detta kan ta en stund om du laddar upp stora filer...`,
    );
    handleCreateSftpFile({
      dir: "media",
      file: props.input.fileInput[0],
      isPublic: true,
      overwrite: true,
      filename,
    })
      .then((url) => {
        toast.dismiss(updateToastId);
        toast.success("Filuppladdningen lyckades");
        if (url) {
          updateZenithMedia({
            id: id,
            coverImage: props.coverImage,
            title: props.title,
            year: props.year,
            url: url,
          });
        }
      })
      .catch((err: Error) => {
        toast.dismiss(updateToastId);
        toast.error(
          "Något gick fel vid uppladdningen av filen. \n" + err.message,
        );
      });
  };

  const { mutate: updateZenithMedia } = useUpdateZenithMediaAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteZenithMedia } = useDeleteZenithMediaAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertZenithMediaForm
            key={id}
            defaultValues={{
              input: {
                fileInput: undefined,
                url: values.url,
              },
              ...values,
            }}
            formType="update"
            onSubmit={({ ...newValues }) => {
              if (
                newValues.input.fileInput ||
                newValues.title !== values.title
              ) {
                void handleUpdateZenithMediaFile(newValues);
              } else {
                //Delete old file if it exists
                if (values.url.startsWith(basePath)) {
                  handleDeleteSftpFile(values.url).catch((err) => {
                    let errMessage =
                      "Kunde inte ta bort den gamla filen från servern.";
                    if (err instanceof Error) {
                      errMessage += "\n" + err.message;
                    }
                    toast.error(errMessage);
                  });
                }
                updateZenithMedia({
                  id: id,
                  url: newValues.input.url,
                  ...newValues,
                });
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
