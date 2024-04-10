import { useState, type FC } from "react";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";

import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import {
  useDeleteHomepageCarouselAsAuthed,
  useUpdateHomepageCarouselAsAuthed,
} from "~/hooks/mutations/useMutateHomepageCarousel";
import type { HomepageCarouselType } from "./homepage-carousel-columns";
import UpsertHomepageCarouselForm from "./upsert-homepage-carousel-form";

export const HomepageCarouselTableActions: FC<HomepageCarouselType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateHomepageCarousel } = useUpdateHomepageCarouselAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteHomepageCarousel } = useDeleteHomepageCarouselAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertHomepageCarouselForm
            key={id}
            defaultValues={{ ...values, endDate: values.endDate || undefined }}
            formType="update"
            onSubmit={(updatedValues) =>
              updateHomepageCarousel({
                id: id,
                ...updatedValues,
              })
            }
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera bild"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteHomepageCarousel({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
