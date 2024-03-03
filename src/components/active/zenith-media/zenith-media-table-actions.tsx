import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { api } from "~/utils/api";
import type { ZenithMediaType } from "./zenith-media-columns";

export type ZenithFormValuesType = {
  coverImage: string;
  input: {
    fileInput?: File[];
    url?: string;
  };
  title: string;
  year: number;
};

export const ZenithMediaTableActions: FC<ZenithMediaType> = ({
  id,
  ...values
}) => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateZenithMediaFile = (props: ZenithFormValuesType): void => {
    console.log("update", props.input.fileInput?.length);
  };

  const { mutate: updateZenithMedia } =
    api.zenithMedia.updateOneAsAuthed.useMutation({
      onMutate: () => toast.loading("Uppdaterar media..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Mediet har uppdaterats!");
        void ctx.zenithMedia.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const { mutate: deleteZenithMedia } =
    api.zenithMedia.deleteOneAsAuthed.useMutation({
      onMutate: () => toast.loading("Raderar media..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.zenithMedia.invalidate();
      },
      onSuccess: () => toast.success("Median har raderats!"),
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
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
                url: "",
              },
              ...values,
            }}
            formType="update"
            onSubmit={({ ...rest }) => {
              console.log("Files", rest.fileInput);
              if (rest.fileInput) {
                handleUpdateZenithMediaFile(rest);
              }
              updateZenithMedia({
                id: id,
                ...rest,
              });
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera media"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteZenithMedia({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
