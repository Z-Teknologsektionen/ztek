import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { useCreateHomepageCarouselAsAuthed } from "~/hooks/mutations/useMutateHomepageCarousel";
import UpsertHomepageCarouselForm from "./upsert-homepage-carousel-form";

interface HomepageCarouselTableToolbarProps<TData> {
  table: Table<TData>;
}

export const HomepageCarouselTableToolbar = <TData,>({
  table: _table,
}: HomepageCarouselTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    mutate: createNewHomepageCarousel,
    isLoading: creatingNewHomepageCarousel,
  } = useCreateHomepageCarouselAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* Add filters here */}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertHomepageCarouselForm
                key={"new"}
                formType="create"
                onSubmit={(values) => createNewHomepageCarousel(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Lägg till ny bild"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewHomepageCarousel}
                size="lg"
                type="button"
                variant="outline"
              >
                Lägg till ny bild
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
