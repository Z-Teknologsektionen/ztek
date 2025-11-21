import { useState, type FC } from "react";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteCarouselAsActive,
  useUpdateCarouselAsActive,
} from "~/hooks/mutations/useMutateHomePageCarousel";
import { imageOperations } from "~/utils/sftp/handle-image-forms";
import type { HomePageCarouselItemType } from "./home-page-carousel-columns";
import UpsertHomePageCarouselForm from "./upsert-home-page-carousel-form";

export const HomePageCarouselTableActions: FC<HomePageCarouselItemType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateItem } = useUpdateCarouselAsActive({
    onSuccess: () => setIsOpen(false),
  });
  const { mutate: deleteItem } = useDeleteCarouselAsActive({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertHomePageCarouselForm
            defaultValues={{
              committeeId: values.committeeId,
              endDateTime: values.endDateTime
                ? new Date(values.endDateTime).toISOString()
                : null,
              startDateTime: values.startDateTime
                ? new Date(values.startDateTime).toISOString()
                : null,
              imageUrl: values.imageUrl,
              linkToUrl: values.linkToUrl,
              imageCredit: values.imageCredit,
            }}
            formType="update"
            onSubmit={async ({ imageUrl, imageFile, ...rest }) => {
              // upload (and remove old) image to sftp and get url
              const imageResult = await imageOperations.processImageChanges({
                newImageFile: imageFile,
                currentImageUrl: imageUrl,
                oldImageUrl: values.imageUrl,
                entityName: "carousel",
              });

              if (!imageResult.success) {
                return;
              }

              // upload non-image data to db
              updateItem({
                id,
                imageUrl: imageResult.data || "",
                ...rest,
              });
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => {
          //remove from sftp
          imageOperations
            .removeImage({
              imageUrl: values.imageUrl,
            })
            .catch(() => {}); //fail silently (clutter sftp server in worst case scenario)

          //remove from db
          deleteItem({ id });
        }}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
